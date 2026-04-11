const _config = {
    port:process.env.PORT,
    databaseUrl:process.env.DB_URL
}

export const config = Object.freeze(_config);//iska matbl frezz ho gya h aab koi edit nahi kr skta