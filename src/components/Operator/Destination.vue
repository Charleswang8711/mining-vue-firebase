<template>

<div class="container">
    <h2 class="center deep-purple-text">SMS Operation Platform</h2>

   
      
        

             <div class="divider"></div>
             <div class="section">
               <h5 class=" col s12 left deep-purple-text" style="margin-bottom: 20px;">Select Destination</h5>
             <div class="row" >

           
          <div class="col s3" v-for="(destination,index) in destinations" :key="index">
              <!-- <router-link :to="{ name: 'HomeOp',params:{ docidDCOp : docidDCOp, docidLoadSuper: docidLoadSuper}}"> -->
                  <i class="waves-effect waves-light btn-large " @click="addLoad(destination)">{{destination}}</i>

                  <br>
                  <br>
              <!-- </router-link> -->
            </div>
          
          </div>

          
          
           </div>

          <div class="divider"></div>

          <div class="section">

  
         <p style=" color: red; ">Current Path:</p>
          
          <p>Activity -->Dig Unit -->Shot -->Material --> Destination</p>
          <span v-for="(item, index) in path" :key="index">
           {{item}} --></span>

          </div>


        <div class="divider"></div>

          <div class="section">

          <p v-if="feedback" class="red-text center">{{feedback}}</p>

          <div class="left field">
            <router-link :to="{ name: 'Material',params:{PreStartID : this.PreStartID, shift: this.shift,date: this.date,truckNum: this.truckNum,month: this.month, year: this.year,username: this.username,docidLoadSuper : docidLoadSuper,LoadId: LoadId,from:'RL'}}">
             <i class="small  material-icons">arrow_back</i>
           </router-link>
          </div>

          <div class="field center">
            <button class="btn deep-purple" @click="delLoad" >Cancel load </button>
          </div>

         </div>

            
        
  

    </div>


  

  
  


</template>

<script >

import db from "@/firebase/init"
import firebase from 'firebase'
import moment from 'moment'

export default {
  name: 'Destination',
  props: ['shift','date','truckNum','month','year','username','docidLoadSuper','LoadId','PreStartID'],

  data () {
    return {

      destinations:null,
      path:[],
      feedback:null
      

    }
  },
  methods: {

   addLoad(newitem){
            
            // get the TimerId.
            // If the current time exists in the load record, it is a TimerId
            // if it does not exist, the current time is the end of the timer
            let refLR = db.collection('operator-DC').doc(this.LoadId)

            refLR.get().then( docsnapshot => {
          

                if(docsnapshot.exists)
                {
                  // which means the current time is the end of the timer
                  // get the doc reference
                  this.feedback = null
                  let docreference = docsnapshot.ref

                  docreference.set(
                    {
                      Destination:newitem,
               
                    },
                    {merge: true})
                  .then(() => {
                    // go to next action
                      this.$router.push({ name: 'DigUnit', 
                          params:{ PreStartID : this.PreStartID,LoadId : this.LoadId, shift: this.shift,date: this.date,truckNum: this.truckNum,month: this.month, year: this.year,username: this.username, docidLoadSuper : this.docidLoadSuper,from:'destination'}})

                  })
                  .catch( err => {
                    console.log(err);
                  })
                  

                }
                else
                {
                  // this is a new load record, the current time is the beginning of the timer

                 this.feedback = "this load record does not exist,Please go back to Operation Platform to create one"


                }

          

            })
      
      },

    delLoad(){

        // get a querysnapshot, Since we don`t have doc id,we just have attribute key
        let refLR = db.collection('operator-DC').doc(this.LoadId)

        refLR.delete().then( () => {

            this.$router.push({ name: 'HomeOp', 
                  params:{ PreStartID : this.PreStartID,shift: this.shift,date: this.date,truckNum: this.truckNum,month: this.month, year: this.year,username: this.username, docidLoadSuper : this.docidLoadSuper}})

        }).catch(err => {
        console.log(err)
      })
    

        

    

      }
   },

  created() {

      // get the activities in real-time
    
      let ref = db.collection('load-haul-surper').doc(this.docidLoadSuper)
        console.log(ref);
         ref.onSnapshot(snapshot => {
          this.destinations = snapshot.data().destination 
          console.log(this.destinations);  
    })

    let refdes = db.collection('operator-DC').doc(this.LoadId)

    refdes.get().then( docsnapshot => {

          this.path.push(docsnapshot.data().Activity)
          this.path.push(docsnapshot.data().DigUnit)        
          this.path.push(docsnapshot.data().RL) 
          this.path.push(docsnapshot.data().Shot)
          this.path.push(docsnapshot.data().Material)

    })


 }


}

 
  



</script>

<style scoped>
.row{
  margin-top:70px;
}
.right{
  margin-top:10px;
}
.col{
  margin-bottom: 20px;
}
p{
  margin:0px;
}


</style>