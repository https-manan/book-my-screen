import { Socket, Server } from "socket.io";
import redis from "../config/redis";

export const registerSocketHandler = (socket: Socket, io: Server) => {

    //So 1st socket connection is user joins a room means he is on the showId so we create a room for that
    socket.on("Join-show", async ({ showId }) => { //ye showId FE se aaygi

        if (!showId) return;

        socket.join(showId);
        socket.data.showId = showId;

        console.log(`Socket ${socket.id} has joined ${showId}`);

        //now jo saari seats hai iss room me means with this showID un saari locked seats ko FE mai bhajdenge

        try {
            /*
             * We use the actual seat-lock keys as the source of truth.
             *
             * Each locked seat is stored as:
             * seat-lock:${showId}:${seatId}
             *
             * This is better than maintaining another Redis set because
             * the individual seat-lock keys automatically expire after 5 minutes.
             */

            const keys = await redis.keys(`seat-lock:${showId}:*`);

            const lockedSeats = keys.map((key) =>
                key.replace(`seat-lock:${showId}:`, "")
            );

            socket.emit("locked-seats-initials", {
                seatIds: lockedSeats,
            });

        } catch (error) {
            console.error("Error while getting locked seats:", error);

            socket.emit("locked-seats-initials", {
                seatIds: [],
            });
        }
    });


    //now we gonna lock that seat for 5 min when user click on proceed than that seats gonna be locked for 5 min

    socket.on("lock-seats", async ({ showId, seatIds, userId }) => {

        if (!seatIds?.length || !showId || !userId) return;

        try {

            /*
             * WATCH makes Redis watch all requested seat-lock keys.
             *
             * If another request changes any of these keys after we check them,
             * EXEC will fail instead of allowing both requests to lock the seats.
             */

            const seatLockKeys = seatIds.map(
                (seatId: string) => `seat-lock:${showId}:${seatId}`
            );

            await redis.watch(...seatLockKeys);

            const unavailableSeats: string[] = [];

            //W gonna check if seats with ids are already locked or so?

            for (let i = 0; i < seatLockKeys.length; i++) {

                const seatLockKey = seatLockKeys[i];

                const existingLock = await redis.get(seatLockKey);

                if (existingLock) {

                    //Basically agar phale se locked hai to push em inside unavailable seats

                    unavailableSeats.push(seatIds[i]);
                }
            }


            //Basically agar seat already locked then reject the request

            if (unavailableSeats.length > 0) {

                await redis.unwatch();

                socket.emit("seat-locked-failed", {
                    showId,
                    requested: seatIds,
                    alreadyLocked: unavailableSeats,
                });

                return;
            }


            //Agar saari seats he available hai to we gonna lock for 5 mins by storing em in redis.

            /*
             * MULTI/EXEC makes the actual locking operation happen together.
             *
             * NX = only create the lock if the key does not already exist.
             *
             * EX = automatically expire the lock after 300 seconds.
             *
             * Because the keys are WATCHed, if another user manages to
             * change one of them before EXEC, Redis aborts the transaction.
             */

            const transaction = redis.multi();

            for (const seatId of seatIds) {

                const seatLockKey = `seat-lock:${showId}:${seatId}`;

                transaction.set(
                    seatLockKey,
                    userId,
                    "EX",
                    300,
                    "NX"
                );
            }

            const result = await transaction.exec();


            /*
             * If result is null, one of the watched keys changed while
             * we were trying to lock the seats.
             *
             * This means another request won the race.
             */

            if (result === null) {

                socket.emit("seat-locked-failed", {
                    showId,
                    requested: seatIds,
                    alreadyLocked: [],
                    message:
                        "Seats were locked by another user. Please try again.",
                });

                return;
            }


            /*
             * Check whether all Redis SET commands succeeded.
             *
             * If every result is "OK", our seats were successfully locked.
             */

            const lockSuccessful = result.every(
                ([error, value]) => !error && value === "OK"
            );

            if (!lockSuccessful) {

                socket.emit("seat-locked-failed", {
                    showId,
                    requested: seatIds,
                    alreadyLocked: [],
                    message:
                        "Some seats could not be locked. Please try again.",
                });

                return;
            }


            // Notify all users in the room about updated locked seats

            io.to(showId).emit("seats-locked", {
                showId,
                seatIds,
                userId,
            });


            /*
             * IMPORTANT:
             *
             * Tell the user who requested the lock that Redis successfully
             * locked the seats.
             *
             * The frontend uses this event to navigate to checkout.
             */

            socket.emit("seat-lock-success", {
                showId,
                seatIds,
            });

        } catch (error) {

            try {
                await redis.unwatch();
            } catch (unwatchError) {
                console.error(
                    "Redis unwatch error:",
                    unwatchError
                );
            }

            console.error(
                "Error while locking seats:",
                error
            );

            socket.emit("seat-locked-failed", {
                showId,
                requested: seatIds,
                alreadyLocked: [],
                message:
                    "Something went wrong while locking seats.",
            });
        }
    });


    socket.on("unlock-seats", async ({ showId, seatIds, userId }) => {

        if (!showId || !seatIds?.length || !userId) return;

        try {

            for (const seatId of seatIds) {

                const seatLockKey =
                    `seat-lock:${showId}:${seatId}`;

                /*
                 * Only the user who owns the lock should be able to unlock it.
                 */

                const existingLock =
                    await redis.get(seatLockKey);

                if (existingLock === userId) {

                    // remove individual seat lock

                    await redis.del(seatLockKey);
                }
            }

            io.to(showId).emit("seat-unlocked", {
                showId,
                seatIds,
                userId,
            });

        } catch (error) {

            console.error(
                "Error while unlocking seats:",
                error
            );
        }
    });


    socket.on("disconnect", () => {

        const showId = socket.data.showId;

        console.log(
            `Socket ${socket.id} disconnected from show ${showId}`
        );
    });
};