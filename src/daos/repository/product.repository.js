class ProductRepository{
    constructor(dao){
        this.dao=dao;
    }

    async addProduct(product){
        const result = await this.dao.addProduct(product);
        return result;
    }


    async getProducts(){
        const result = await this.dao.getProducts();
        return result;
    }

    async getPaginateProducts(query={},options={}){
        const result = await this.dao.getPaginateProducts(query={},options={});
        return result;
    }

    async getProductById(id){
        const result = await this.dao.getProductById(id);
        return result;
    }

    async updateProduct(id,product){
        const result = await this.dao.findByIdAndUpdate(id,product);
        return result;
    }

    async deleteProduct(id){
        const result = await this.dao.deleteProduct(id);
        return result;
    }

}

export {ProductRepository};