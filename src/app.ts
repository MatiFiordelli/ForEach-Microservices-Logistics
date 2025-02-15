import express, { Request, Response } from 'express'
import cors from 'cors'
import { router } from './routes/index.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { mongodbConnection } from './middlewares/mongodbConnection.js'
import { setupSwagger } from './swagger.js'

const app = express()
setupSwagger(app);
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())


const port = process.env.PORT || 4001
const corsHeaders = (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, DELETE, POST, PUT')
    res.status(200)
}

app.options('api/trip-records', corsHeaders)

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome message
 *     responses:
 *       200:
 *         description: Welcome message
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Welcome to logistics API
 */
app.get('/', (req, res) => {
    res.send('Welcome to logistics API')
})

app.use(mongodbConnection)

app.use('/api', router)

//aca hay que poner un error 404 ya que no encontro ninguna ruta:
/*
app.use((req, res, next) => {
    const error = new Error('Route Not Found');
    error.name = "RouteNotFound";
    next(error)
*/

app.use(errorHandler)

app.listen(port, () => console.log(`Server Working on port ${port}`))

