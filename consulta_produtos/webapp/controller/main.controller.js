sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/library",
    "sap/ui/model/json/JSONModel",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, library, JSONModel) {
        "use strict";
        
        let urlObject = library.URLHelper;
                 
        return Controller.extend("consultaprodutos.controller.main", {
            onInit: function () {
                let produto = {};
                let productModel = new JSONModel(produto);
                let view = this.getView();
                view.setModel(productModel, "ModeloProduto");

            },
            onPressImg: function (oEvent) {
                urlObject.redirect(oEvent.getSource().getSrc(), true);

            },

            onPressBuscar: function () {       
                let codProduto = this.byId("buscar_produto").getValue(); 
                
                debugger
                let parametersAPI = {
                    url: "https://world.openfoodfacts.org/api/v2/product/" + codProduto + ".json",
                    method: 'GET',
                    async: true,
                    crossDomain: true,
                };

                $.ajax(parametersAPI).done(function(resposta) {

                    let oProdutoModelo =  this.getView().getModel("ModeloProduto");

            
                    oProdutoModelo.setData({});
                    debugger
                    oProdutoModelo.refresh();
                
                    oProdutoModelo.setData(resposta);
                    debugger
                    oProdutoModelo.refresh();
                
                }.bind(this) )
                    
                
                .fail(function(error){
                    console.log ("Erro ao buscar o produto: " + error )
                }.bind(this));

              

            }

            
        });
    });
