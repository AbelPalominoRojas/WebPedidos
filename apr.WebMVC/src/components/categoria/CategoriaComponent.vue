<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header bg-dark card-header-flex py-2">
                    <div class="h5 mb-0 text-white">Categorias</div>

                    <button type="button" class="btn btn-sm btn-success" @click="insert()">
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
                                    <th>Categoria</th>
                                    <th>Descripcion</th>    
                                </tr>    
                            </thead>
                            <tbody>
                                <tr v-for="cat in categorias" :key="cat.Idcategoria">
                                    <td class="item-action" width="100">
                                        <button type="button" @click="itemAction(cat,'show-item')" class="btn btn-sm btn-outline-info">
                                            <i class="fas fa-search-plus"></i>
                                        </button>
                                        <button type="button" @click="itemAction(cat,'edit-item')" class="btn btn-sm btn-outline-primary">
                                            <i class="fas fa-marker"></i>
                                        </button>
                                        <button type="button" @click="itemAction(cat,'delete-item')" class="btn btn-sm btn-outline-danger">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                    <td v-text="cat.Idcategoria"></td>
                                    <td v-text="cat.Nombre"></td>
                                    <td v-text="cat.Descripcion"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" v-text="titleForm">Modal title</h5>
                        <button type="button" class="close" @click="closeModal()">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Categoria<i class="text-info">(*)</i></label>
                            <input type="text" class="form-control" :class="{' is-invalid':errorExists('Nombre')}" v-model="categoria.Nombre">
                            <div class="invalid-feedback" v-if="errorExists('Nombre')" v-text="findError('Nombre').errordetail"></div>
                        </div>
                        <div class="form-group">
                            <label>Descripcion</label>
                            <textarea class="form-control" rows="3" v-model="categoria.Descripcion"></textarea>
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
</template>

<script>
    export default {
        data(){
            return{
                errors:[],
                titleForm:'Registrar Categoria',
                isUpdate:false,
                categorias:[],
                categoria:this.initializeCategoria()
            }
        },
        methods:{
            validateFields(){
                this.errors=[];

                if(this.categoria){
                    if(!this.categoria.Nombre){
                        this.setError('Nombre','El campo Categoria es obligatorio');
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
                    case 'edit-item':
                        this.edit(item);
                        break;
                    case 'show-item':
                        
                        break;
                    case 'delete-item':
                        this.removeData(item);
                        break;
                }
            },
            findAll(){
                let me=this;

                axios.get(`${rooturl}/Categoria/findAll`)
                .then(function (response) {
                    // handle success
                    me.categorias = response.data;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
            },
            insert(){
                this.openModal()
                this.titleForm ='Registrar Categoria';
                this.isUpdate = false;
                this.categoria = this.initializeCategoria();
            },
            edit(item){
                this.openModal();
                this.titleForm ='Editar Categoria';
                this.isUpdate = true;
                this.categoria = item;
            },
            saveData(){
                if(this.validateFields().length >0){
                    return;
                }

                let me= this,
                    actionUrl ='';

                if(this.isUpdate)
                    actionUrl = `${rooturl}/Categoria/edit`;
                else
                    actionUrl=`${rooturl}/Categoria/create`;


                axios.post(actionUrl, this.categoria)
                        .then(function(response) {

                            let result = response.data;

                            if(result.State){
                                me.findAll();
                                me.closeModal();
                            }
                            alert(result.Message)

                            //console.log(response);
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
            },
            removeData(item){

                let option = confirm(`Desea Eliminar el Producto ${item.Nombre}`);

                if(!option) return;

                let me=this;

                axios.post(`${rooturl}/Categoria/remove`,{idcategoria:item.Idcategoria})
                .then(function (response) {
                    let result = response.data;

                    if(result.State){
                        me.findAll();
                    }
                    alert(result.Message)

                    //console.log(response);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
            },
            openModal(){
                $('#exampleModal').modal('show');
                this.errors=[];
            },
            closeModal(){
                $('#exampleModal').modal('hide');
                this.categoria = this.initializeCategoria();
            },
            initializeCategoria(){
                return {
                    Idcategoria:0,
                    Nombre:'',
                    Descripcion:''
                };
            }
        },
        mounted() {
            this.findAll();
        }
    }
</script>
