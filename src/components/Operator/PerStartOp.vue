<template>

<div class="container">

	   <div class="field center deep-orange-text">
       	<h5> HEAVY VEHICLE PERSTART CHECK LIST</h5>
     </div>
     <form class="col s12" @submit.prevent="savePreStart">

      <div class="divider"></div>

      <div class="section">

         <div class="row" style="margin-top:0px;">

        <div class="input-field col s12 m12 l12">
          <input  id="MachineNo" type="text" class="validate" v-model="Start">
          <label for="MachineNo">Start SMU(engine hours)</label>
        </div>

        <div class="input-field col s12 m4 l4">
          <input  id="MachineNo" type="text" class="validate" v-model="MachineNo">
          <label for="MachineNo">Machine No</label>
        </div>

        <div class="input-field col s12 m4 l4">
          <input id="Site" type="text" class="validate" v-model="Site">
          <label for="Site">Site</label>
        </div>

  
        <div class="input-field col s12 m4 l4 ">
          <input  id="Opname" type="text" class="validate" v-model="Opname">
          <label for="Opname">Op name</label>
        </div>
    
 
        <div class="input-field col s12 m4 l4">
          <input id="Date" type="text" class="validate" v-model="Date2">
          <label for="Date">Date</label>
        </div>
  
    
        <div class="input-field col s12 m4 l4">
          <input id="StartHour" type="text" class="validate" v-model="StartHour">
          <label for="StartHour">Start Hour</label>
        </div>
     
   
        <div class="input-field col s12 m4 l4">
          <input id="Op Sign" type="text" class="validate" v-model="OpSign">
          <label for="Op Sign">Op Sign</label>
        </div>
   
 
        <div class="input-field col s12 m4 l4">
          <input id="Shift" type="text" class="validate" v-model="Shift">
          <label for="Shift">Shift</label>
        </div>
    
 
        <div class="input-field col s12 m4 l4">
          <input id="EndHour" type="text" class="validate" v-model="EndHour">
          <label for="EndHour">End Hour</label>
        </div>
    
  
        <div class="input-field col s12 m4 l4">
          <input id="MaintSign" type="text" class="validate" v-model="MaintSign">
          <label for="MaintSign">Maint Sign</label>
        </div>
      </div>



     </div>

    
     
      
      <div class="divider"></div>

      <div class="section">
       	<h6> Operators Responsibility Site </h6>
      </div>

      <div class="divider"></div>
      
      <div class="section">
       	<h6> Category A Faults: Notify Supervisor - Not to be Operated without SMS Rental Workshop Approval   </h6>
      </div>
     
      <div class="divider"></div>
       
       <div class="section">

         <div class="row" style="margin-top:0px;">

            <div class="col s12 m6 l6">

              <p> Fluids(Sight Glass or Gauge Check)</p>
              <p>
                <label class="box col s12 m12 l12">
                  <input type="checkbox" class="filled-in" v-model="Fuel" />
                  <span>Fuel </span>
                </label>
              <label class="box col s12 m12 l12">
                <input type="checkbox" class="filled-in" v-model="TransOil" />
                <span>Transmission Oil</span>
              </label>
              <label class="box col s12 m12 l12" >
                <input type="checkbox" class="filled-in" v-model="HydrOil" />
                <span>Hydraulic Oil </span>
              </label>
              <label class="box col s12 m12 l12">
                <input type="checkbox" class="filled-in" v-model="SteerOil" />
                <span>Steering Oil (trucks only)  </span>
              </label >
              <label class="box col s12 m12 l12 ">
                <input type="checkbox" class="filled-in" v-model="EngineOil" />
                <span> Engine Oil</span>
              </label >
              <label class="box col s12 m12 l12">
                <input type="checkbox" class="filled-in" v-model=" Coolant " />
                <span>  Coolant </span>
              </label>
              </p>
            </div>

              <div class="col s12 m6 l6">

                <p> General Condition   </p>
                <p>
                  <label class="box col s12 m12 l12">
                    <input type="checkbox" class="filled-in" v-model="Tracks" />
                    <span>Tyres/Tracks no stuck rocks   </span>
                  </label>
                  <label class="box col s12 m12 l12">
                    <input type="checkbox" class="filled-in" v-model="Tyres" />
                    <span> Tyres no deep cuts, steel or bulges </span>
                  </label>
                  <label class="box col s12 m12 l12" >
                    <input type="checkbox" class="filled-in" v-model="MachineDa" />
                    <span>Machine Damage  </span>
                  </label>
                  <label class="box col s12 m12 l12">
                    <input type="checkbox" class="filled-in" v-model="GET" />
                    <span> G.E.T. Edges - none missing    </span>
                  </label >
                  <label class="box col s12 m12 l12">
                    <input type="checkbox" class="filled-in" v-model="Pressure" />
                    <span> Pressure Vessels no Damage or leaks    </span>
                  </label >

                  </p>
            </div>
        </div>

        <div class="row" style="margin-top:0px;">



         

                <div class="col s12 m6 l6">

                <p> Satety Devices </p>
                <p>
                  <label class="box col s12 m12 l12">
                    <input type="checkbox" class="filled-in" v-model="Access" />
                    <span>Access Steps or Handrails </span>
                  </label>
                <label class="box col s12 m12 l12">
                  <input type="checkbox" class="filled-in" v-model="Seat" />
                  <span>Seat Belts and Seats - Working and Adjusted </span>
                </label>
                <label class="box col s12 m12 l12" >
                  <input type="checkbox" class="filled-in" v-model="Radio" />
                  <span>2 Way Radio</span>
                </label>
                <label class="box col s12 m12 l12">
                  <input type="checkbox" class="filled-in" v-model="SteerOil" />
                  <span>Steering Oil (trucks only)  </span>
                </label >
                <label class="box col s12 m12 l12 ">
                  <input type="checkbox" class="filled-in" v-model="Fire" />
                  <span> Fire Extinguisher (it fitted)    </span>
                </label >
                <label class="box col s12 m12 l12">
                  <input type="checkbox" class="filled-in" v-model=" EMS " />
                  <span>  E.M.S. - All workings </span>
                </label>
                <label class="box col s12 m12 l12">
                  <input type="checkbox" class="filled-in" v-model=" Mirrors " />
                  <span>  Driving Mirrors </span>
                </label>
                </p>
              </div>

                <div class="col s12 m6 l6">

                <p>Pre-Start Tests</p>
                <p>
                  <label class="box col s12 m12 l12">
                    <input type="checkbox" class="filled-in" v-model="Steering" />
                    <span>Steering   </span>
                  </label>
                <label class="box col s12 m12 l12">
                  <input type="checkbox" class="filled-in" v-model="ServiceBrack" />
                  <span>Service Brake  </span>
                </label>
                <label class="box col s12 m12 l12" >
                  <input type="checkbox" class="filled-in" v-model="EmergencyBrack" />
                  <span>Emergency Brake </span>
                </label>
                <label class="box col s12 m12 l12">
                  <input type="checkbox" class="filled-in" v-model="ParkBrake" />
                  <span>Park Brake  </span>
                </label >
                <label class="box col s12 m12 l12 ">
                  <input type="checkbox" class="filled-in" v-model="Signal" />
                  <span> Signal Horn </span>
                </label >
                <label class="box col s12 m12 l12">
                  <input type="checkbox" class="filled-in" v-model=" EmergencySteer " />
                  <span>  Emergency Steering  </span>
                </label>

                <label class="box col s12 m12 l12">
                  <input type="checkbox" class="filled-in" v-model=" Alarm " />
                  <span>  Reverse Alarm      </span>
                </label>

                </p>
              </div>

            </div>



        </div>

         <div class="divider">
         </div>
         <div class="section">
            <h6> Authorised For Return To Work </h6>

            <div class="row" style="margin-top:0px;">

              <div class="input-field col s12 m4 l4">
                <input id="AuthorDate" type="text" class="validate" v-model="AuthorDate">
                <label for="AuthorDate">Date</label>
              </div>

                <div class="input-field col s12 m4 l4">
                <input id="Fitters" type="text" class="validate" v-model="Fitters">
                <label for="Fitters"> Fitters/Supervisor Name</label>
              </div>

                <div class="input-field col s12 m4 l4">
                <input id="Signature" type="text" class="validate" v-model="Signature">
                <label for="Signature">Signature</label>
              </div>

            </div>

            
      


         </div>

         <div class="divider"></div>

         <div class="section">
            <h6> Category B Faults: Notify Supervisor - machine able to continue normal operation</h6>

            <div class="row" style="margin-top:0px;">

                  <div class="col s12 m6 l6">

                    <p>
                      <label class="box col s12 m12 l12">
                        <input type="checkbox" class="filled-in" v-model=" Windscreen " />
                        <span>  Windscreen Wipers/Washer (Cat. A if raining)  </span>
                      </label>
                      <label class="box col s12 m12 l12">
                        <input type="checkbox" class="filled-in" v-model=" Gauges " />
                        <span>  Gauges   </span>
                      </label>
                      <label class="box col s12 m12 l12">
                        <input type="checkbox" class="filled-in" v-model=" Wheel " />
                        <span>  Wheel Chocks  </span>
                      </label>
                      <label class="box col s12 m12 l12">
                        <input type="checkbox" class="filled-in" v-model=" Cargo " />
                        <span>  Cargo barrier (if applicable) </span>
                      </label>
                    </p>

                  </div>

                  <div class="col s12 m6 l6">

                    <p>
                      <label class="box col s12 m12 l12">
                        <input type="checkbox" class="filled-in" v-model=" Cabin " />
                        <span> Operator Cabin - Clean and Tidy    </span>
                      </label>
                      <label class="box col s12 m12 l12">
                        <input type="checkbox" class="filled-in" v-model=" Leaks " />
                        <span>  Oil Leaks   </span>
                      </label>
                      <label class="box col s12 m12 l12">
                        <input type="checkbox" class="filled-in" v-model=" Air " />
                        <span>  Air Conditioner  </span>
                      </label>
                      <label class="box col s12 m12 l12">
                        <input type="checkbox" class="filled-in" v-model=" Alarm " />
                        <span>  Reverse Alarm  </span>
                      </label>
                    </p>

                  </div>

            </div>

            
      


         </div>

         <div class="divider"></div>

         <div class="section">

            	<h6>	Defect List </h6>

              

             <div v-for="(defect,index) in defects" :key="index" class="row card-panel" style="margin-top:0px;">

               <div class="field right">
                  <i class="material-icons add" @click="adddefect">add</i>
                  <i class="material-icons remove" @click="deldefect(index)">remove</i>
              </div>

               <div class="input-field col s12">
                <textarea id="Item" class="materialize-textarea" v-model="defect.defectitem"></textarea>
                <label for="Item">Defect Item</label>
                </div>

                <div class="input-field col s12">
                <textarea id="Required" class="materialize-textarea" v-model="defect.Required"></textarea>
                <label for="Required">Required Initials: </label>
                </div>

                <div class="input-field col s12">
                <textarea id="Repaired" class="materialize-textarea" v-model="defect.Repaired"></textarea>
                <label for="Repaired">Repaired</label>
                </div>

            </div>
        </div>


         

         <p v-if="feedback" class="red-text center">{{feedback}}</p>

      		<div class="field center">
				    <button class="btn deep-purple">submit </button>
		   	 </div>

    </form>
  

	</div>
	


</template>

<script >

import db from "@/firebase/init"
import firebase from 'firebase'

export default {
  name: 'PerStartOp',
  props: ['shift','date','truckNum','month','year','username','docidLoadSuper'],

  data () {
    return {

      Start:null,
      MachineNo:null,
      Opname:null,
      Site:null,
      Date2:null,
      StartHour:null,
      OpSign:null,
      Shift:null,
      EndHour:null,
      MaintSign:null,
      Fuel:null,
      TransOil:null,
      HydrOil:null,
      SteerOil:null,
      EngineOil:null,
      Coolant:null,
      Tracks:null,
      Tyres:null,
      MachineDa:null,
      GET:null,
      Pressure:null,
      Access:null,
      Seat:null,
      Radio:null,
      SteerOil:null,
      Fire:null,
      EMS:null,
      Mirrors:null,
      Steering:null,
      ServiceBrack:null,
      EmergencyBrack:null,
      ParkBrake:null,
      Signal:null,
      EmergencySteer:null,
      Alarm:null,
      AuthorDate:null,
      Fitters:null,
      Signature:null,
      Windscreen:null,
      Gauges:null,
      Wheel:null,
      Cargo:null,
      Cabin:null,
      Leaks:null,
      Air:null,
      Alarm:null,
      defects:[
        {
          defectitem:'',
          Required:'',
          Repaired:'',
        }
      ],
      PreStartID:null,
      feedback:null
      

    }
  },
  methods: {

    savePreStart()
    {
      
      this.PreStartID = this.shift+this.date+this.truckNum+this.username+this.MachineNo

      let prestartref = db.collection('operator-PreStart').doc(this.PreStartID)

      prestartref.set({

      Start:this.Start,
      MachineNo:this.MachineNo,
      Site:this.Site,
      Date2:this.Date2,
      StartHour:this.StartHour,
      OpSign:this.OpSign,
      Shift:this.Shift,
      EndHour:this.EndHour,
      MaintSign:this.MaintSign,
      Fuel:this.Fuel,
      TransOil:this.TransOil,
      HydrOil:this.HydrOil,
      SteerOil:this.SteerOil,
      EngineOil:this.EngineOil,
      Coolant:this.Coolant,
      Tracks:this.Tracks,
      Tyres:this.Tyres,
      MachineDa:this.MachineDa,
      GET:this.GET,
      Pressure:this.Pressure,
      Access:this.Access,
      Seat:this.Seat,
      Radio:this.Radio,
      SteerOil:this.SteerOil,
      Fire:this.Fire,
      EMS:this.EMS,
      Mirrors:this.Mirrors,
      Steering:this.Steering,
      ServiceBrack:this.ServiceBrack,
      EmergencyBrack:this.EmergencyBrack,
      ParkBrake:this.ParkBrake,
      Signal:this.Signal,
      EmergencySteer:this.EmergencySteer,
      Alarm:this.Alarm,
      AuthorDate:this.AuthorDate,
      Fitters:this.Fitters,
      Signature:this.Signature,
      Windscreen:this.Windscreen,
      Gauges:this.Gauges,
      Wheel:this.Wheel,
      Cargo:this.Cargo,
      Cabin:this.Cabin,
      Leaks:this.Leaks,
      Air:this.Air,
      Alarm:this.Alarm,
      defects:this.defects,
      }).then(() => {

           this.$router.push({ name: 'HomeOp', 
       params:{ PreStartID:this.PreStartID,shift: this.shift,date: this.date,truckNum: this.truckNum,month: this.month, year: this.year,username: this.username, docidLoadSuper: this.docidLoadSuper}})

       }).catch(err => {
             console.log(err)
         })






    },

    adddefect(){
      this.defects.push({
        defectitem:'',
        Required:'',
        Repaired:''
      })

      
      
    },
    deldefect(index){

      this.defects.splice(index,1)

    }


  },

  created()
  {
  	console.log(this.docidDCOp);

  	console.log(this.docidLoadSuper);
  }

 }
	



</script>

<style >

  .add, .remove{
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
.row{
  margin-top: 0px;
}





</style>