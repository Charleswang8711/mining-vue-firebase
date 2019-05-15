<template>

        <div class="container">

                <div class="right field" style="margin-top: 20px;">
                         <router-link :to="{ name: 'HomeOp',params:{ docidLoadSuper : this.docidLoadSuper}}">
                                 <i class="deep-purple btn-small ">Home</i>
                         </router-link>
                </div>

               <div class="section">

                <form class="card-panel" style="margin-top:50px" @submit.prevent="addendshift">

                <p style="color:red"> The Truck Number : {{truckNum}}</p>
              
      		<input type="text" placeholder="Enter a ending SMU .." name="endsmu" v-model="endSMU">

      		<p v-if="feedback" class="red-text center">{{feedback}}</p>

      		<div class="field center">
		  <button class="btn deep-purple">submit </button>
		</div>

        	</form>

                </div>
              

            


            
        </div>
    
</template>

<script>

import db from "@/firebase/init"
import firebase from 'firebase'

export default {
  name: 'Endshift',
  props: ['shift','date','truckNum','month','year','username','docidLoadSuper','PreStartID'],

  data () {
    return {

      endSMU:null,
      feedback:false

    }
  },
  methods: {

          addendshift(){

                  console.log(this.PreStartID);
                  

                   let refLR = db.collection('operator-PreStart').doc(this.PreStartID)

            refLR.get().then( docsnapshot => {

                if(docsnapshot.exists)
                {
                    // set the endtime and cycletime into the this doc
                    let docref = docsnapshot.ref
                    docref.set(
                      {
                        EndSMU: this.endSMU,    
                      },
                      {merge:true}
                    ).then(() => {

                            this.$router.push({ name: 'HomeOp', 
                          params:{ PreStartID : this.PreStartID, shift: this.shift,date: this.date,truckNum: this.truckNum,month: this.month, year: this.year,username: this.username, docidLoadSuper : this.docidLoadSuper}})
                      console.log("the new  Pre Start record created successfully");
                      
                    }).catch( err => {
                      console.log(err);
                      
                    })
                }
                else
                {
                  this.feedback =" Please create a new  Pre Start record"
                }

              })


          }

  }
}
    
</script>

<style scoped>

</style>
