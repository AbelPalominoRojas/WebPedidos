<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header card-header-flex py-2 bg-dark">
                    <div class="h5 mb-0 text-white">Producto</div>
                    <button class="btn btn-sm btn-success" @click="insert()">
                        <i class="fa fa-plus-circle"></i>
                        Nuevo
                    </button>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-sm table-hover table-striped table-bordered mb-1">
                            <thead>
                                <tr>
                                    <th width="100">Acciones</th>
                                    <th>Cod</th>
                                    <th>Producto</th>
                                    <th>Presentacion</th>
                                    <th>Precio</th>
                                    <th>Categoria</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="prod in productos" :key="prod.Idproducto">
                                    <td class="item-action" width="100">
                                        <button type="button" @click="itemAction(prod,'show-item')" class="btn btn-sm btn-outline-info">
                                            <i class="fas fa-search-plus"></i>
                                        </button>
                                        <button type="button" @click="itemAction(prod,'edit-item')" class="btn btn-sm btn-outline-primary">
                                            <i class="fas fa-marker"></i>
                                        </button>
                                        <button type="button" @click="itemAction(prod,'delete-item')" class="btn btn-sm btn-outline-danger">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                    <td v-text="prod.Idproducto"></td>
                                    <td v-text="prod.Nombre"></td>
                                    <td v-text="prod.Presentacion"></td>
                                    <td v-text="$options.filters.formatNumber(prod.Precio)"></td>
                                    <td v-text="prod.categoria.Nombre"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Modal -->
            <div class="modal" tabindex="-1" role="dialog" id="modalProducto" >
                <div class="modal-dialog" role="document" v-if="isOpenModal">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Producto</h5>
                            <button type="button" class="close" @click="closeModal()">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Categoria<i class="text-info">(*)</i></label>
                                <select v-model="producto.Idcategoria" class="form-control" :class="{' is-invalid' :errorExists('Idcategoria')}">
                                    <option value="0">-Seleccione-</option>
                                    <option v-for="cat in categorias" :key="cat.Idcategoria"
                                        :value="cat.Idcategoria" v-text="cat.Nombre">
                                        Seleccione
                                    </option>
                                </select>
                                <div class="invalid-feedback" v-if="errorExists('Idcategoria')" v-text="findError('Idcategoria').errordetail"></div>
                            </div>
                            <div class="form-group" >
                                <label >Producto<i class="text-info">(*)</i></label>
                                <input type="text" v-model="producto.Nombre" class="form-control" :class="{' is-invalid' :errorExists('Nombre')}">
                                <div class="invalid-feedback" v-if="errorExists('Nombre')" v-text="findError('Nombre').errordetail"></div>
                            </div>
                            <div class="form-group">
                                <label >Presetacion<i class="text-info">(*)</i></label>
                                <input type="text" v-model="producto.Presentacion" class="form-control" :class="{' is-invalid' :errorExists('Presentacion')}">
                                <div class="invalid-feedback" v-if="errorExists('Presentacion')" v-text="findError('Presentacion').errordetail"></div>
                            </div>
                            <div class="form-group">
                                <label >Precio</label>
                                <input type="text" v-model="producto.Precio" class="form-control">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" @click="saveData()">
                                <i class="fa fa-save"></i>
                                Guardar
                            </button>
                            <button type="button" class="btn btn-outline-secondary ml-2" @click="closeModal()">
                                <i class="fa fa-window-close"></i> 
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            productos:[],
            categorias:[],
            producto:this.initiaizeProducto(),
            isUpdate:false,
            titleForm:'',
            errors:[],
            isOpenModal:false
        }
    },
    filters:{
        formatNumber(value){
            return value.toFixed(2);
        }
    },
    methods:{
        validateFields(){
            this.errors=[];

            if(this.producto){

                if(this.producto.Idcategoria == 0){
                    this.setError('Idcategoria','El campo Categoria es obligatorio');
                }

                if(!this.producto.Nombre){
                    this.setError('Nombre','El campo Producto es obligatorio');
                }

                if(!this.producto.Presentacion){
                    this.setError('Presentacion','El campo Presentacion es obligatorio');
                }
            }

            return this.errors;
        },
        setError(errormodel, errordetail){
            this.errors.push({errormodel:errormodel,errordetail:errordetail});
        },
        errorExists(errormodel){
            let result = this.errors.filter(err => err.errormodel === errormodel);
            return Object.keys(result).length;
        },
        findError(errormodel){
            return this.errors.find(err => err.errormodel === errormodel);
        },
        itemAction(item,type){
            switch (type) {
                case 'show-item':
                    
                    break;
            
                case 'edit-item':
                    this.edit(item);
                    break;

                case 'delete-item':
                    this.removeData(item);
                    break;
            }
        },
        findAll(){
            let me = this;

            axios.get(`${rooturl}/Producto/findAll`)
                .then((response)=>{
                    this.productos = response.data;
                })
                .catch((error)=>{

                });
        },
        insert(){
            this.openModal();
            this.titleForm = 'Registrar Producto';
            this.isUpdate = false;
            this.producto = this.initiaizeProducto();
        },
        edit(item){
            this.openModal();
            this.titleForm = 'Actulizar Producto';
            this.isUpdate = true;
            this.producto = item;

        },
        saveData(){

            if(this.validateFields().length >0){
                return;
            }

            let me = this,
                actionUrl='';

            if(this.isUpdate)
                actionUrl=`${rooturl}/Producto/edit`;
            else
                actionUrl = `${rooturl}/Producto/create`;

            axios.post(actionUrl,this.producto)
                .then((response)=>{
                    let result = response.data;

                    if(result.State){
                        me.closeModal();
                        me.findAll();
                    }

                    alert(result.Message);
                })
                .catch((error)=>{
                    console.log(error);
                })

        },
        removeData(item){

            let option = confirm(`Desea Eliminar el Producto ${item.Nombre}`);

            if(!option) return;

            let me = this;

            axios.post(`${rooturl}/Producto/remove`,{idproducto : item.Idproducto})
                .then((response)=>{
                    let result = response.data;

                    if(result.State){
                        me.findAll();
                    }

                    alert(result.Message);
                })
                .catch((error)=>{
                    console.log(error);
                });
        },
        selectCategorias(){
            let me=this;

            axios.get(`${rooturl}/Categoria/findAll`)
                .then((response)=>{
                    me.categorias = response.data;
                })
                .catch((error)=>{

                });
        },
        openModal(){
            this.isOpenModal=true;
            this.errors=[];
            $('#modalProducto').modal('show');
        },
        closeModal(){
            $('#modalProducto').modal('hide');
            this.errors=[];
            this.isOpenModal = false;
        },
        initiaizeProducto(){
            return {
                Idproducto:0,
                Idcategoria:0,
                Nombre:'',
                Presentacion:'',
                Precio:0
            };
        }
    },
    mounted(){
        this.findAll();
        this.selectCategorias();
    }
}
</script>

