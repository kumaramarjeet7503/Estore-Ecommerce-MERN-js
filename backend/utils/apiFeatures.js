class ApiFeatures{
    constructor(query,queryStr)
    {
        this.query = query ;
        this.queryStr = queryStr ;
    }

    search()
    {
        const keyword = this.queryStr.keyword  ? {
            name:{
                $regex : this.queryStr.keyword,
                $options : "i",
            },
        } : {} ;

        this.query = this.query.find({...keyword}) ;
        return this ;

    }

    filter(){
        const queryFilter = {...this.queryStr} ;
        //  Remove some fields for category
        const removeFields = ["keyword","page","limit"] ;
        removeFields.forEach((key)=> delete queryFilter[key]) ;
        this.query = this.query.find(queryFilter) ;
        return this;
    }
} ;

module.exports = ApiFeatures ;
