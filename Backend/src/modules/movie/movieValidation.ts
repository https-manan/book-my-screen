import {z} from 'zod'

export const movieSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  duration: z.coerce.number().min(1), //.coerce forces input to be number if entered str then it converts to num
  genre: z.preprocess(                      
    (val) => (typeof val === "string" ? JSON.parse(val) : val), //To ye iss problem ko solve krta hai ki agr input aase hai :-genre: '["Action", "Drama"]' to use actual array maai convert krta hai like this:-genre: ["Action", "Drama"]   
    z.array(z.string()).min(1)
  ),
  releaseDate: z.coerce.date(),                 
  languages: z.preprocess(
    (val) => (typeof val === "string" ? JSON.parse(val) : val),  
    z.array(z.string()).min(1)
  ),
  certification: z.string().min(1),
  rating: z.coerce.number().min(0).max(10).default(0),
  votes: z.coerce.number().min(0).default(0),
  format: z.preprocess(
    (val) => (typeof val === "string" ? JSON.parse(val) : val),
    z.array(z.string()).default(["2D"])
  ),
});

export type MovieInput = z.infer<typeof movieSchema>;



/*
JSON.parse() converts a JSON-formatted string into an actual JavaScript value.
Example:
'["a","b"]'  ->  ["a","b"]
The first is just text (a string) describing an array.
JSON.parse reads that text and turns it into a real JavaScript array.
*/