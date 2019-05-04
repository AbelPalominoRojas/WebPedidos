<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Example Component</div>

                    <div class="card-body">
                        I'm an example component.
                    </div>
                </div>
            </div>

            <div class="col-md-8 pt-3">
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" @click="showModal()">
                    Launch demo modal
                </button>
            </div>

        </div>

    <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="close" @click="hideModal()">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="hideModal()">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        methods:{
            showModal(){
                console.log('click');
                $('#exampleModal').modal('show');

                axios.get('https://vuetable.ratiw.net/api/users')
                .then(function (response) {
                    // handle success
                    console.log(response);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
            },
            hideModal(){
                $('#exampleModal').modal('hide');
            }
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
