const http = require('http');

//组合中间件
const componse = (middlewareList) => {
    //中间件运行机制
    return (ctx) => {
        const dispath = (i) => {
            const fn = middlewareList[i];
            try{
                return Promise.resolve(
                    fn(ctx, dispath.bind(null, i + 1))
                )
            }catch(err){
                return Promise.reject(err)
            }
        }
        return dispath(0)
    }
}

class LikeKoa2{
    constructor(){
        this.middlewareList = []
    }

    use(fn){
        this.middlewareList.push(fn);
        return this;
    }

    createContent(req, res) {
        //返回ctx
        const ctx = {
            req,
            res
        }
        ctx.query = req.query;
        return ctx
    }

    handleRequest(fn, ctx) {
        return fn(ctx);
    }

    callback(){
        const fn = componse(this.middlewareList)

        return (req, res) => {
            const ctx = this.createContent(req,res);
            return this.handleRequest(fn,ctx)
        }
    }

    listen(...args){
        const server = http.createServer(this.callback());
        server.listen(...args);
    }

}

module.exports = LikeKoa2