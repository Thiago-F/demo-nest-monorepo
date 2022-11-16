
import { NestMiddleware, Injectable } from '@nestjs/common'

@Injectable()
export class RequestMiddleware implements NestMiddleware {
    use(request: any, response: any, next: (error?: any) => void) {
        const startTime = new Date().getTime()

        const { method, path, body, baseUrl } = request
        console.log(`[${method}] ${baseUrl}${path} - ${JSON.stringify(body)}`)

        response.on('finish', () => {
            const endTime = new Date().getTime()
            console.log(`Request finished in ${endTime - startTime}ms \n`)
        })

        return next()
    }
}