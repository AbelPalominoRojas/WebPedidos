<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header bg-dark card-header-flex py-2">
                    <h5 class="mb-0 text-white" >Pedidos</h5>
                    <a :href="urlCreate" class="btn btn-sm btn-success">
                        <i class="fa fa-plus-circle"></i>
                        Nuevo
                    </a>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-sm table-striped table-hover table-bordered mb-1">
                            <thead>
                                <tr>
                                    <th width="100">Acciones</th>
                                    <th>Cod</th>
                                    <th>Fecha</th>
                                    <th>Cliente</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="ped in pedidos" :key="ped.Idpedido">
                                    <td class="item-action" width="100">
                                        <button class="btn btn-sm btn-outline-info">
                                            <i class="fas fa-search-plus"></i>
                                        </button>
                                        <button class="btn btn-sm btn-outline-primary">
                                            <i class="fas fa-marker"></i>
                                        </button>
                                        <button class="btn btn-sm btn-outline-danger">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                    <td v-text="ped.Idpedido"></td>
                                    <td v-text="ped.FechaString"></td>
                                    <td>
                                        <span v-text="ped.cliente.Nombres"></span>
                                        <span v-text="ped.cliente.Apellidos"></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            urlCreate:`${rooturl}/Pedido/Create/`,
            itemTypeAction:itemTypeAction,
            pedidos:[]
        }
    },
    methods:{
        itemAction(item,type){
            switch (type) {
                case itemTypeAction.show:
                    
                    break;
            
                case itemTypeAction.edit:
                    
                    break;
                
                case itemTypeAction.delete:
                    
                    break;
            }
        },
        findAll(){
            let me=this;

            axios.get(`${rooturl}/Pedido/findAll`)
                .then((response)=>{
                    me.pedidos= response.data;
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
    },
    mounted(){
        this.findAll();
    }
}
</script>
