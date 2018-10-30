// 提供在Browser端的本地数据持久化功能，基于indexDB，实现模拟的Rest接口服务
import Dexie from 'dexie'
import FlatPlainObj from 'flat-plain-object'

// The private attribute
let indexDBInstance = new WeakMap()

class IndexDBRest {
    /**
     * 构造函数 
     * @param {String} dbName indexDB实例的名字
     * @param {Number} version  indexDB实例的版本号，高版本将覆盖低版本
     * @param {Object} schema indexDB实例的schema，使用json object表示，其中每一个属性表示一个object store，类似关系数据库中的一个table
     * 详情参考http://dexie.org/docs/Version/Version.stores()  
     * @param {Object} initData 设置indexDB实例的初始数据，
     * 其形式应为{<resource1>: [record1, ..., recordN], ... ,<resourceN>: [record1, ..., recordN]}
     */
    constructor(dbName, version, schema, initData){
        let db = new Dexie(dbName)
        db.version(version).stores(schema)
        db.open().catch(e => {
            throw new Error(`IndexDB open failed: ${e.stack}`)
        })

        db.on("populate", () => {
            for(let key in initData){
                if(initData.hasOwnProperty(key))
                    for(let record of initData[key]){
                        db.table(key).add(record)
                    }
            }
        })

        indexDBInstance.set(this, db)
    }

    getCollection(resource, query){
        const db = indexDBInstance.get(this)
        const filter =  FlatPlainObj(query.filter)
        const sort = query.sort
        const range = query.range 

        let collection = JSON.stringify(filter) === '{}' 
            ? db.table(resource).toCollection() 
            : db.table(resource).toCollection().filter(record => {
                for(const field in filter){
                    const regExpPatternStr = filter[field]
                    const regExp = new RegExp(regExpPatternStr, 'i')
                    const flatedRecord = FlatPlainObj(record)
                    if(!(regExp.test(flatedRecord[field])))
                        return false
                }
                return true
            })
        if(sort[1] === 'DESC')
            collection = collection.reverse()
        return collection.sortBy(sort[0]).then(rs => {
            return {
                result: rs.slice(range[0], range[1] + 1),
                totalCount: rs.length
            }
        })
    }

    getOne(resource, id){
        const db = indexDBInstance.get(this)
        return db.table(resource).get(id).then(r => ({result: r}))
    }

    create(resource, data){
        const db = indexDBInstance.get(this)
        return db.table(resource).add(data).then(rID => db.table(resource).get(rID)).then(r => ({result: r}))
    }

    update(resource, id, data){
        const db = indexDBInstance.get(this)
        return db.table(resource).update(id, data).then(r => {
            if(r)
                return db.table(resource).get(id).then(r => ({result: r}))
            else
                throw new Error(`Update ${resource} id:${id} failed, the resource doesn't exist or provided data is the same with the orogin one`)
        })
    }

    delete(resource, id){
        const db = indexDBInstance.get(this)
        let prevR
        return db.transaction('rw', db.table(resource), async () => {
            await db.table(resource).get(id).then(r => {
                if(!r)
                    throw new Error(`Not found the ${resource} id:${id}`)
                prevR = r
            })
            await db.table(resource).delete(id)
            return db.table(resource).get(id).then(r => {
                if(r)
                    throw new Error(`Delete operation failed for the ${resource} id:${id}`)
                return {result: prevR}
            })
        })
    }
}

export default IndexDBRest