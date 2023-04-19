define(["esri/dijit/AttributeInspector","esri/graphic",'dojo/dom','dojo/_base/declare', 'jimu/BaseWidget',"esri/tasks/query","esri/renderers/ClassBreaksRenderer","esri/symbols/SimpleFillSymbol","esri/Color","esri/InfoTemplate", "esri/symbols/SimpleLineSymbol"],
  function(AttributeInspector,Graphic, dom, declare, BaseWidget,Query,ClassBreaksRenderer,SimpleFillSymbol,Color,InfoTemplate, SimpleLineSymbol) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {
      // Custom widget code goes here

      baseClass: 'calculadoraInversionCCAA_widget',

      //this property is set by the framework when widget is loaded.
      //name: 'CustomWidget',


      //methods to communication with app container:

      postCreate: function() {
        console.log('postCreate');
        this.calculationsDone = 0;

      },

      startup: function() {
       console.log('startup');
       console.log(this.map)
       let idCapa = this.map.itemInfo.itemData.operationalLayers[0].id
       this.comunidadesFL = this.map.getLayer(idCapa)
  
       console.log('comunidades',this.comunidadesFL)   
      },

      patrimoniocalc: function(){
        const taxRates = {  
          Cataluña: [0.21, 0.315, 0.525, 0.945, 1.365, 1.785, 2.205, 3.2],
          Aragon: [0.2, 0.3, 0.5, 0.9, 1.3, 1.7, 2.1, 3.5],
          Baleares: [0.28, 0.41, 0.69, 1.24, 1.79, 2.35, 2.9, 3.45],
          Asturias: [0.22, 0.33, 0.56, 1.02, 1.48, 1.97, 2.48, 3],
          Extremadura: [0.3, 0.45, 0.75, 1.35, 1.95, 2.55, 3.15, 3.75],
          C_La_Mancha: [0.2, 0.3, 0.5, 0.9, 1.3, 1.7, 2.1, 3.5],
          C_Leon: [0.2, 0.3, 0.5, 0.9, 1.3, 1.7, 2.1, 3.5],
          Cantabria: [0.24, 0.36, 0.61, 1.09, 1.57, 2.06, 2.54, 3.03],
          Andalucia: [0, 0, 0, 0, 0, 0, 0, 0],
          C_Valenciana: [0.25, 0.37, 0.62, 1.12, 1.62, 2.12, 2.62, 3.5],
          Murcia: [0.24, 0.36, 0.6, 1.08, 1.56, 2.04, 2.52, 3],
          Galicia: [0.2, 0.3, 0.5, 0.9, 1.3, 1.7, 2.1, 3.5],
          Navarra: [0.16, 0.24, 0.4, 0.72, 1.04, 1.36, 1.68, 2],
          La_Rioja: [0.2, 0.3, 0.5, 0.9, 1.3, 1.7, 2.1, 3.5],
          Canarias: [0.2, 0.3, 0.5, 0.9, 1.3, 1.7, 2.1, 3.5],
          Madrid: [0, 0, 0, 0, 0, 0, 0, 0],
          Pais_Vasco: [0.2, 0.2, 0.2, 0.6, 1, 1.5, 1.75, 2]
        };
        
        const wealthThresholds = [  
          167129,
          334252,
          668499,
          1000000,
          2500000,
          5300000,
          10000000,
        ];
      },

      findTaxBracketPatri: function(wealth){
        const wealthThresholds = [  
          167129,
          334252,
          668499,
          1000000,
          2500000,
          5300000,
          10000000,
        ];
        let bracketIndex = 0; 
        for (let threshold of wealthThresholds) { 
          if (wealth <= threshold) break; 
          bracketIndex++;
        }
        return bracketIndex; 
      },

      calculateTaxRatesPatri: function(wealth){
        const taxRates = {  
          Cataluña: [0.21, 0.315, 0.525, 0.945, 1.365, 1.785, 2.205, 3.2],
          Aragon: [0.2, 0.3, 0.5, 0.9, 1.3, 1.7, 2.1, 3.5],
          Baleares: [0.28, 0.41, 0.69, 1.24, 1.79, 2.35, 2.9, 3.45],
          Asturias: [0.22, 0.33, 0.56, 1.02, 1.48, 1.97, 2.48, 3],
          Extremadura: [0.3, 0.45, 0.75, 1.35, 1.95, 2.55, 3.15, 3.75],
          C_La_Mancha: [0.2, 0.3, 0.5, 0.9, 1.3, 1.7, 2.1, 3.5],
          C_Leon: [0.2, 0.3, 0.5, 0.9, 1.3, 1.7, 2.1, 3.5],
          Cantabria: [0.24, 0.36, 0.61, 1.09, 1.57, 2.06, 2.54, 3.03],
          Andalucia: [0, 0, 0, 0, 0, 0, 0, 0],
          C_Valenciana: [0.25, 0.37, 0.62, 1.12, 1.62, 2.12, 2.62, 3.5],
          Murcia: [0.24, 0.36, 0.6, 1.08, 1.56, 2.04, 2.52, 3],
          Galicia: [0.2, 0.3, 0.5, 0.9, 1.3, 1.7, 2.1, 3.5],
          Navarra: [0.16, 0.24, 0.4, 0.72, 1.04, 1.36, 1.68, 2],
          La_Rioja: [0.2, 0.3, 0.5, 0.9, 1.3, 1.7, 2.1, 3.5],
          Canarias: [0.2, 0.3, 0.5, 0.9, 1.3, 1.7, 2.1, 3.5],
          Madrid: [0, 0, 0, 0, 0, 0, 0, 0],
          Pais_Vasco: [0.2, 0.2, 0.2, 0.6, 1, 1.5, 1.75, 2]
        };
        const bracketIndex = this.findTaxBracketPatri(wealth);
        this.taxResults = {};  
        for (let region in taxRates) {
          this.taxResults[region] = taxRates[region][bracketIndex];
        }
        console.log('taxResults:', this.taxResults)
        this.percentPatriFinal()
        return this.taxResults;    
      },

      addPatrimonioResults: function(){
        const resultsDiv = document.getElementById("results");
        let taxPercentages = {};
      
        const wealth = parseInt(document.getElementById("wealth").value);
        taxPercentages = this.calculateTaxRatesPatri(wealth);
        const taxPercentagesCalculatedEvent = new CustomEvent('taxPercentagesCalculated', { detail: { taxPercentages } });
        document.dispatchEvent(taxPercentagesCalculatedEvent);
      
        let resultsHtml = "<h2>Porcentajes de impuestos al Patrimonio:</h2><ul>";
        for (let region in taxPercentages) {
            resultsHtml += `<li>${region}: ${taxPercentages[region]}%</li>`;
          }
        resultsHtml += "</ul>";
      
        resultsDiv.innerHTML = resultsHtml;
                
          },

      irpfcalc: function(){
        const taxirpf = {
          Cataluña: [21.5, 26, 33.5, 40, 46, 48],
          Aragon: [19.5, 24.5, 35, 40.5, 46, 47.5],
          Baleares: [19, 23.75, 31, 38.5, 45.5, 47],
          Asturias: [19.5, 22, 31, 38.5, 45, 48],
          Extremadura: [19, 24.5, 31.5, 42, 47, 47.5],
          C_La_Mancha: [19, 24, 30, 37, 45, 45],
          C_Leon: [19, 24, 29, 37, 44, 44],
          Cantabria: [19, 24, 32, 40.5, 46.5, 48],
          Andalucia: [19.25, 24, 30, 37.4, 43, 47.4],
          C_Valenciana: [19.5, 25, 33, 42, 46.5, 49],
          Murcia: [19.4, 24.24, 30.06, 37.68, 45.8, 45.8],
          Galicia: [19, 23.75, 30.5, 37, 43, 45],
          Navarra: [21.5, 28, 32, 41.5, 49, 52],
          La_Rioja: [18.5, 23.6, 30, 37.5, 46, 48],
          Canarias: [18.5, 23.5, 33.5, 42, 44.5, 46.5],
          Madrid: [18.5, 23.2, 28.3, 36.4, 43.5, 43.5],
          Pais_Vasco: [22, 30, 35, 42, 46.5, 49],   
        };
        
        
        const wealthThresholds2 = [
          12450,
          20200,
          35200,
          60000,
          300000,
        ];
      }, 

      findTaxBracket: function (wealth) {
        const wealthThresholds2 = [
          12450,
          20200,
          35200,
          60000,
          300000,
        ];
        let bracketIndex = 0;
        for (let threshold of wealthThresholds2) {
          if (wealth <= threshold) break;
          bracketIndex++;
        }
        return bracketIndex;
      },
      
      calculateTaxirpf: function (wealth) {
        const taxirpf = {
          Cataluña: [21.5, 26, 33.5, 40, 46, 48],
          Aragon: [19.5, 24.5, 35, 40.5, 46, 47.5],
          Baleares: [19, 23.75, 31, 38.5, 45.5, 47],
          Asturias: [19.5, 22, 31, 38.5, 45, 48],
          Extremadura: [19, 24.5, 31.5, 42, 47, 47.5],
          C_La_Mancha: [19, 24, 30, 37, 45, 45],
          C_Leon: [19, 24, 29, 37, 44, 44],
          Cantabria: [19, 24, 32, 40.5, 46.5, 48],
          Andalucia: [19.25, 24, 30, 37.4, 43, 47.4],
          C_Valenciana: [19.5, 25, 33, 42, 46.5, 49],
          Murcia: [19.4, 24.24, 30.06, 37.68, 45.8, 45.8],
          Galicia: [19, 23.75, 30.5, 37, 43, 45],
          Navarra: [21.5, 28, 32, 41.5, 49, 52],
          La_Rioja: [18.5, 23.6, 30, 37.5, 46, 48],
          Canarias: [18.5, 23.5, 33.5, 42, 44.5, 46.5],
          Madrid: [18.5, 23.2, 28.3, 36.4, 43.5, 43.5],
          Pais_Vasco: [22, 30, 35, 42, 46.5, 49],   
        };
        
        const bracketIndex = this.findTaxBracket(wealth);
        this.taxResults2 = {};
      
        for (let region in taxirpf) {
          this.taxResults2[region] = taxirpf[region][bracketIndex];
          //console.log('aqui',taxResults2)
        }
        console.log('taxResults2',this.taxResults2); 
        this.irpfPercentFinal()
        return this.taxResults2;
      }, 

      addirpfResults: function(){
               
        const resultsDiv = dom.byId("results2");
        let taxPercentages = {};
      
        const wealth = parseInt(dom.byId("wealth2").value);
        taxPercentages = this.calculateTaxirpf(wealth);
        const taxPercentagesCalculatedEvent2 = new CustomEvent('taxPercentagesCalculated2', { detail: { taxPercentages } });
        document.dispatchEvent(taxPercentagesCalculatedEvent2);
      
        let resultsHtml = "<h2>Porcentajes de impuestos en IRPF:</h2><ul>";
        for (let region in taxPercentages) {
          resultsHtml += `<li>${region}: ${taxPercentages[region]}%</li>`;
        }
        resultsHtml += "</ul>";
      
        resultsDiv.innerHTML = resultsHtml;
      }, 

      percentPatriFinal: function(){
        const taxPercentagesPatrimonio = this.taxResults;
        console.log('taxPercentagesPatrimonio', taxPercentagesPatrimonio);
    
        let taxPercentagesPatrimonioCopy = { ...taxPercentagesPatrimonio };
        for (let region in taxPercentagesPatrimonioCopy) {
          taxPercentagesPatrimonioCopy[region] += 1;
        }
    
        let lowestPercentage = Infinity;
        for (let region in taxPercentagesPatrimonioCopy) {
          if (taxPercentagesPatrimonioCopy[region] < lowestPercentage) {
            lowestPercentage = taxPercentagesPatrimonioCopy[region];
          }
        }
    
        let adjustedPercentagesIP = {};
        for (let region in taxPercentagesPatrimonioCopy) {
          adjustedPercentagesIP[region] = (lowestPercentage / taxPercentagesPatrimonioCopy[region]) * 100;
        }
    
        console.log('adjustedPercentagesIP', adjustedPercentagesIP);
    
        this.finalPercentagesIP = {};
        for (let region in adjustedPercentagesIP) {
          this.finalPercentagesIP[region] = adjustedPercentagesIP[region] * 0.3;
        }
    
        console.log('this.finalPercentagesIP', this.finalPercentagesIP);
    
        this.calculationsDone++;
      },

      irpfPercentFinal: function(){
        const taxPercentagesIRPF = this.taxResults2;
        console.log('taxPercentagesIRPF',taxPercentagesIRPF);
    
        let lowestPercentage2 = Infinity;
        for (let region in taxPercentagesIRPF) {
          if (taxPercentagesIRPF[region] < lowestPercentage2) {
            lowestPercentage2 = taxPercentagesIRPF[region];
          }
        }
    
        let adjustedPercentagesIRPF = {};
        for (let region in taxPercentagesIRPF) {
          adjustedPercentagesIRPF[region] = (lowestPercentage2 / taxPercentagesIRPF[region]) * 100;
        }
    
        console.log('adjustedPercentagesIRPF', adjustedPercentagesIRPF);
    
        this.finalPercentagesIRPF = {};
        for (let region in adjustedPercentagesIRPF) {
          this.finalPercentagesIRPF[region] = adjustedPercentagesIRPF[region] * 0.3;
        }
    
        console.log('finalPercentagesIRPF', this.finalPercentagesIRPF);
    
        this.calculationsDone++;
      },

      sumPercentages: function() {
       
        const totaldatos = {
          "Andalucia": 143.60,
          "Aragon": 121.98,
          "Asturias": 111.83,
          "Baleares": 138.91,
          "Canarias": 112.75,
          "Cantabria": 149.85,
          "C_Leon": 135.47,
          "C_La_Mancha": 127.08,   
          "Cataluña": 167.96,
          "C_Valenciana": 130.83,
          "Extremadura": 115.16,
          "Galicia": 142.88,
          "Madrid": 201.06,
          "Murcia": 132.38,
          "Navarra": 157.55,
          "Pais_Vasco": 169.86,
          "La_Rioja": 126.29
        };

        
          const puntosInversion = {};
          
        
          const objectIds = {
            "Andalucia": 17,
            "Aragon": 16,
            "Asturias": 15,
            "Baleares": 14,
            "Canarias": 1,
            "Cantabria": 13,
            "C_Leon": 12,
            "C_La_Mancha": 11,   
            "Cataluña": 10,
            "C_Valenciana": 9,
            "Extremadura": 8,
            "Galicia": 7,
            "Madrid": 6,
            "Murcia": 5,
            "Navarra": 4,
            "Pais_Vasco": 3,
            "La_Rioja": 2
          };
          
          for (let region in this.finalPercentagesIP) {
            puntosInversion[region] = {
              "value": (this.finalPercentagesIP[region] + this.finalPercentagesIRPF[region] + totaldatos[region]).toFixed(2),
              "OBJECTID": objectIds[region]
            };
          }

          console.log (puntosInversion,'PUNTOSINVERSION')

          let query = new Query(); // Se crea un objeto Query
          query.where = '1=1'; // Se establece una condición de consulta (en este caso, se consulta todo)
          this.comunidadesFL.queryFeatures(query, (featureSet) => { // Se hace una consulta de las features que coinciden con la condición
          console.log('featureSet', featureSet.features); //  acceder al array de features
          const featuresToUpdate = featureSet.features.map((feature) =>{ // Se crea un array con las features que se van a actualizar
          feature.attributes.Index_Invest = puntosInversion[feature.attributes.NAMEUNIT].value;
          return feature
          });
          console.log('featuresToUpdate', featuresToUpdate); // Se devuelve la feature actualizada al array "featuresToUpdate"
          
          
          const edits = featuresToUpdate.map((feature) => {
            return {
              attributes: feature.attributes, //elemento correspondiente a "featuresToUpdate".
              objectId: feature.attributes.OBJECTID,
            };
          });
        
          this.comunidadesFL.applyEdits(null, edits, null)
          .then((editsResult) => {
            console.log('Features updated successfully', editsResult);
          })
          .catch((error) => {
            console.error('Error updating features', error);
          });
        

            // Crear símbolo predeterminado
            var line = new SimpleLineSymbol();
            line.setWidth(0.5);
            line.setColor(new Color([214, 214, 214, 1]));
            var defaultSymbol = new SimpleFillSymbol();
            defaultSymbol.setColor(new Color([150, 150, 150, 0.5]));
            defaultSymbol.setOutline(line)

            var class1 = new SimpleFillSymbol()
            class1.setColor(new Color([163, 255, 115, 0.50]))
            class1.setOutline(line)

            var class2 = new SimpleFillSymbol()
            class2.setColor(new Color([76, 230, 0, 0.50]))
            class2.setOutline(line)

            var class3 = new SimpleFillSymbol()
            class3.setColor(new Color([56, 168, 0, 0.50]))
            class3.setOutline(line)

            var class4 = new SimpleFillSymbol()
            class4.setColor(new Color([38, 115, 0, 0.7]))
            class4.setOutline(line)

            // Crear renderizador de clase de ruptura
            var renderer = new ClassBreaksRenderer(defaultSymbol, "Index_Invest");

            // Agregar cinco rangos de valores y símbolos correspondientes al renderizador
            renderer.addBreak(0, 166.999,class1);
            renderer.addBreak(167, 199.999,class2);
            renderer.addBreak(200, 249.99, class3);
            renderer.addBreak(250, Infinity,class4);

            var infoTemplate = new InfoTemplate();
            infoTemplate.setTitle("Información de la Comunidad Autónoma");
           
            infoTemplate.setContent(
              "<div class='infotemplate'>" +
              "<div class='title-container'>" +
              "<h2>${Territorios}</h2>" +
              "</div>" +
            
              "<div class='index-invest-container'>" +
              "<span>Puntos de inversión:</span>" +
              "<h3>${Index_Invest}</h3>" +
              "</div>" +
                                
              
            "<div class='block'>" +
              "<div class='block-title'>Datos coyunturales </div>" +
              "<ul>" +
              "<li><strong>Confianza empresarial:</strong> ${Confianza_empresarial}</li>" +
              "<li><strong>IPC:</strong> ${IPC}</li>" +
              "<li><strong>Tasa de paro:</strong> ${Tasa_de_Paro}</li>" +
              "<li><strong>PIB per cápita:</strong> ${PIB_per_capita}</li>" +
              "<li><strong>Producción industrial:</strong> ${Produccion_Industrial}</li>" +
              "<li><strong><strong><span style='font-weight:bold;'>Datos coyunturales totales:</span></strong> ${Datos_coyunturales_total}</li>" +
              
              "</ul>" +
              "</div>" +
              "<hr>" +
              "<div class='block'>" +
              "<div class='block-title'>Datos estructurales </div>" +
              "<ul>" +
              "<li><strong>Riesgo de pobreza:</strong> ${Riesgo_de_pobreza}</li>" +
              "<li><strong>Gasto en I+D:</strong> ${Gasto_ID}</li>" +
              "<li><strong>Crecimiento de la población:</strong> ${Crecimiento_poblacion}</li>" +
              "<li><strong>Índice de competitividad:</strong> ${Indice_competitividad}</li>" +
              "<li><strong>Inversión en las CCAA:</strong> ${Inversion_CCAA}</li>" +
              "<li><strong>Densidad de la población:</strong> ${Densidad_poblacion}</li>" +
              "<li><strong>Precio del M2:</strong> ${PrecioM2}</li>" +
              "<li><strong><strong><span style='font-weight:bold;'>Datos estructurales totales:</span></strong> ${Datos_estrucuturales_totales}</li>" +
              "</ul>" +
              "</div>" +
              "<hr>" +
              "<div class='block'>" +
              "<div class='block-title'>Impuestos</div>" +
              "<ul>" +
              "<li><strong>Impuesto de sucesiones:</strong> ${Impuesto_sucesiones}</li>" +
              "<li><strong>Impuesto de sociedades:</strong> ${Impuesto_sociedades}</li>" +
              "<li><strong>Impuestos actos jurídicos:</strong> ${Impuestos_actos_juridicos}</li>" +
              "<li><strong>IVA:</strong> ${IVA}</li>" +
              "</ul>" +
              "</div>" +
              "</div>"
              );

          

            this.comunidadesFL.setInfoTemplate(infoTemplate);

           
            // Establecer renderizador en la capa de entidades
            this.comunidadesFL.setRenderer(renderer);

            // Agregar la capa de entidades al mapa
            this.map.addLayer(this.comunidadesFL);
            // console.log(this.map.graphicsLayerIds);
            // console.log(this.comunidadesFL.graphics); 
            // console.log(renderer.infos);


        });

      
  
        }
      })


  
      });