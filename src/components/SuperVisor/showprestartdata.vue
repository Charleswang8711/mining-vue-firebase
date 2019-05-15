<template>

<div>

    <div class="card-panel" style="margin:30px;">
      <table>
          <thead>
            <tr>
                <th>Start SMU</th>
                <th>MachineNo</th>
                <th>Site</th>
                <th>Date</th>
                <th>StartHour</th>
                <th>OpSign</th>
                <th>Shift</th> 
                <th>EndHour</th>
                <th>MaintSign</th>
                <th>Fitters/Supervisor Name</th>
                <th>Signature</th>
                <th>End SMU</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for=" dataitem in predatacollections" :key="dataitem.id">

                <td>{{dataitem.Start}}</td>
                <td>{{dataitem.MachineNo}}</td>
                <td>{{dataitem.Site}}</td>
                <td>{{dataitem.Date2}}</td>
                <td>{{dataitem.StartHour}}</td>
                <td>{{dataitem.OpSign}}</td>
                <td>{{dataitem.Shift}}</td>
                <td>{{dataitem.EndHour}}</td>
                <td>{{dataitem.MaintSign}}</td>
                <td>{{dataitem.Fitters}}</td>
                <td>{{dataitem.Signature}}</td>
                <td>{{dataitem.EndSMU}}</td>
              
            </tr>
          </tbody>
        </table>
        </div>

        <i class=" load waves-effect waves-light btn-large " @click="show()">Show Data</i>
</div>
</template>

<script>

import db from '@/firebase/init'
import firebase from 'firebase'
// import DatePicker from 'vue2-datepicker'
// import VueSingleSelect from "vue-single-select"
import moment from 'moment'

export default {

  name: 'DataCollection',
  props:['shift','day'],
  // components: { DatePicker,VueSingleSelect },
  data () {
    return {
      predatacollections:[],
      feedback:null

    }
  },
  methods: {

     show(){


         if(this.shift && (this.day != 'dayandnight'))
       {

         return this.predatacollections.filter( dataitem =>{

          return (dataitem.shift == this.shift && dataitem.date == this.day)

        })

       }
       else if(this.day == 'dayandnight')
       {

          return this.predatacollections.filter( dataitem =>{

          return ( dataitem.date == this.day)

        })

       }

        

    }


  },
  created(){

       let refdc = db.collection('operator-PreStart').orderBy('date')
       
         refdc.onSnapshot(snapshot => {
          
        //  snapshot.docChanges (version 4.12/4.13)
        //  snapshot.docChanges() (version 5.0.0 & up)
      snapshot.docChanges().forEach(change => {

        if(change.type == 'added')
        {
          let doc = change.doc
           let dataitem = doc.data()
          dataitem.id = doc.id  
          this.predatacollections.push(dataitem)

        }
      })
    })

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.DC{

  margin: 0px,20px;


}


</style>
