<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header card-header-flex bg-dark py-2">
                    <h5 class="mb-0 text-white">
                        Nuevo Pedido
                    </h5>
                </div>
                <div class="card-body">
                    
                    <div class="form-row">
                        <div class="form-group col-md-6 col-xl-4">
                            <label>Categoria</label>
                            <select class="form-control" v-model="idcategoria" 
                                @change="selectProductos(idcategoria)">
                                <option value="0">-Seleccione-</option>
                                <option v-for="cat in categorias" :key="cat.Idcategoria"
                                    :value="cat.Idcategoria" v-text="cat.Nombre"></option>
                            </select>
                        </div>
                        <div class="form-group col-md-6 col-xl-4">
                            <label>Producto</label>
                            <select class="form-control" v-model="producto.Idproducto"
                                @change="findProducto(producto.Idproducto)">
                                <option value="0">-Seleccione-</option>
                                <option v-for="prod in productos" :key="prod.Idproducto"
                                    :value="prod.Idproducto" v-text="prod.Nombre"></option>
                            </select>
                        </div>
                        <div class="form-group col-sm-6 col-xl-4">
                            <label>Presentacion</label>
                            <span class="form-control" v-text="producto.Presentacion"></span>
                        </div>
                        <div class="form-group col-sm-6 col-xl-4">
                            <label>Precio</label>
                            <span class="form-control" v-text="producto.Precio"></span>
                        </div>
                        <div class="form-group col-sm-6 col-xl-4">
                            <label>Cantidad</label>
                            <input type="text" class="form-control" v-model="cantidad">
                        </div>
                        <div class="form-group col-sm-6 col-xl-4 d-flex align-items-end justify-content-end">
                            <button class="btn btn-sm btn-success" @click="addDetallePedido()">
                                <i class="fas fa-hand-point-up"></i>
                                Agregar
                            </button>
                        </div>
                    </div>
                    <hr>
                    <div class="form-group">
                        <label>Cliente</label>
                        <select class="form-control" v-model="idcliente">
                            <option value="0">-Seleccionar-</option>
                            <option v-for="cli in clientes" :key="cli.Idcliente" 
                                :value="cli.Idcliente">
                                    <span v-text="cli.Nombres"></span>
                                    <span v-text="cli.Apellidos"></span>
                                </option>
                        </select>
                    </div>
                    <hr>
                    <div class="table-responsive">
                        <table class="table table-sm table-striped table-hover table-bordered mb-1">
                            <thead class="thead-dark">
                                <tr>
                                    <th></th>
                                    <th>Cant.</th>
                                    <th>Detalle</th>
                                    <th>Pecio Unit.</th>
                                    <th>Importe</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(det, index) in detallePedidos" :key="index">
                                    <td>
                                        <button class="btn btn-sm btn-outline-danger border-0 py-1 px-2">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                    <td v-text="det.Cantidad"></td>
                                    <td>
                                        <span v-text="det.producto.Nombre"></span>
                                        <span v-text="det.producto.Presentacion"></span>
                                    </td>
                                    <td v-text="det.producto.Precio"></td>
                                    <td v-text="det.importe"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <hr/>
                    <div class="justify-content-between" style="display: flex;">
                        <div>
                            <a :href="urlList" class="btn btn-info mr-2">
                                <i class="fas fa-reply"></i> <span class="button-text">Atrás</span>
                            </a>
                        </div>
                        <div>
                            <button type="button" class="btn btn-success">
                                <i class="fa fa-save"></i>
                                Guardar
                            </button>
                            <button type="reset" class="btn btn-outline-secondary ml-2">
                                <i class="fa fa-window-close"></i> <span class="button-text">Cancelar</span>
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
          clientes:[],
          categorias:[],
          productos:[],
          idcategoria:0,
          idcliente:0,
          producto:this.initializeProducto(),
          cantidad:0,
          detallePedidos:[],
          urlList:`${rooturl}/Pedido/`,
      }
  },
  methods:{
      selectClientes(){
        let me= this;

        axios.get(`${rooturl}/Cliente/findAll`)
        .then((response)=>{
            me.clientes= response.data;
        })
        .catch((error)=>{
            console.log(error);
        });
      },
      selectCategorias(){

        let me= this;

        axios.get(`${rooturl}/Categoria/findAll`)
        .then((response)=>{
            me.categorias= response.data;
        })
        .catch((error)=>{
            console.log(error);
        });
      },
      selectProductos(idcategoria){
        this.producto = this.initializeProducto();
        this.productos = [];

        if(idcategoria == 0) return;

        let me= this;

        axios.get(`${rooturl}/Producto/findAllByIdCategoria?idcategoria=${idcategoria}`)
        .then((response)=>{
            me.productos= response.data;
        })
        .catch((error)=>{
            console.log(error);
        });
      },
      findProducto(idproducto){
          let me= this;

        axios.get(`${rooturl}/Producto/find?idproducto=${idproducto}`)
        .then((response)=>{
            me.producto= response.data.Data;
        })
        .catch((error)=>{
            console.log(error);
        });
      },
      addDetallePedido(){
        
        let detalle={
            Idpedido:0,
            Idproducto:this.producto.Idproducto,
            Precio:this.producto.Precio,
            Cantidad:this.cantidad,
            producto:this.producto,
            importe:(this.producto.Precio * this.cantidad)
        
        };

        this.detallePedidos.push(detalle);

        this.producto = this.initializeProducto();
        this.cantidad = 0;
      },
      initializeProducto(){
          return {
              Idproducto:0,
              Idcategoria:0,
              Nombre:'',
              Presentacion:'',
              Precio:0
          }
      }
  },
  mounted(){
      this.selectClientes();
      this.selectCategorias();
  }
}
</script>
