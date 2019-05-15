<template>

  <div class="container">

    <h2 class="center deep-purple-text">SMS Operate Platform</h2>
     
    <div class="right field">
      <router-link :to="{ name: 'HomeOp',params:{ PreStartID : this.PreStartID,shift: this.shift,date: this.date,truckNum: this.truckNum,month: this.month, year: this.year,username: this.username, docidLoadSuper : this.docidLoadSuper}}">
              <i class="deep-purple btn-small ">Home</i>
          </router-link>
    </div>

   

     <div class="divider"></div>
     <div class="section">

          <h5 class="center deep-purple-text" style="margin-bottom: 20px;">Select Breakdown items </h5>

          <div class="row" style="margin:0px;">

            <div class="col s12 m4 l3" v-for="(Breakdown,index) in Breakdowns" :key="index">
              <i class="waves-effect waves-light btn-large " @click="addDC(Breakdown)">{{Breakdown}}</i>
            </div>
          
          </div>
           

    </div>

      <div class="right field">

      <router-link :to="{ name: 'DigUnit',params:{ PreStartID : this.PreStartID,shift: this.shift,date: this.date,truckNum: this.truckNum,month: this.month, year: this.year,username: this.username, docidLoadSuper : this.docidLoadSuper, LoadId:this.CurTime,from:'breakdownpage'}}">
              <i class="deep-purple btn-small ">Load</i>
          </router-link> 

      </div> 



      <div class="divider"></div>
        <div class="section">

       <p v-if="feedback" class="red-text center">{{feedback}}</p>

          <!-- <div class="center field">
            <router-link :to="{ name: 'HomeOp',params:{ shift: this.shift,date: this.date,truckNum: this.truckNum,month: this.month, year: this.year,username: this.username, docidLoadSuper :docidLoadSuper}}">
              <i class="deep-purple btn-small ">Back</i>
           </router-link>
          </div> -->

            <div class="left field">
            <router-link :to="{ name: 'HomeOp',params:{ PreStartID : this.PreStartID,shift: this.shift,date: this.date,truckNum: this.truckNum,month: this.month, year: this.year,username: this.username,docidLoadSuper : docidLoadSuper}}">
              <!-- <i class="deep-purple btn-small "> Back</i> -->
              <i class="small  material-icons">arrow_back</i>
           </router-link>
          </div>


        </div>



    </div>
      
   

            
        

 
  


</template>

<script >

import db from "@/firebase/init"
import firebase from 'firebase'
import moment from 'moment'


export default {
  name: 'Standby',
  props: ['shift','date','truckNum','month','year','username','docidLoadSuper','LoadId','PreStartID'],

  data () {
    return {

      Breakdowns:[],
      CurTime: moment(Date.now()).format('LTS'),
      curload:null,
      feedback:null
    


      

    }
  },
  methods: {

    newbreakdown(newitem)
    {

         let refstandby = db.collection('operator-DC').doc(this.CurTime)

        refstandby.set({

          shift: this.shift,
					date: this.date,
					truckNum: this.truckNum,
					username: this.username,
					month: this.month,
					year: this.year,
                       
         Activity:"Breakdown",
        // this is one and only, it is unique
         LoadTime:this.CurTime,
         Comment:newitem

        }).then(() => {

          // this.$router.push({ name: 'HomeOp', 
          //                 params:{ PreStartID : this.PreStartID, shift: this.shift,date: this.date,truckNum: this.truckNum,month: this.month, year: this.year,username: this.username, docidLoadSuper : this.docidLoadSuper}})
          console.log("the new breakdown record created successfully");
          

       }).catch(err => {
             console.log(err)
         })


    },

    addDC(newitem){


    // for the standby page just for create a new one 
     
     this.newbreakdown(newitem)
      
      
      // if( this.from == "digger")
      // {
      //    // save the load in to DC
       
         
      //   let refLR = db.collection('operator-DC').doc(this.LoadId)

      //       refLR.get().then( docsnapshot => {

      //           if(docsnapshot.exists)
      //           {
      //               // set the endtime and cycletime into the this doc
      //               let docref = docsnapshot.ref
      //               docref.set(
      //                 {
      //                   EndTime: this.CurTime,
      //                   CycleTime: '10mins'// this.curtime - loadid
                       
      //                 },
      //                 {merge:true}
      //               ).then(() => {

      //                 // get the current new standby


      //                 this.newstandby(this.diggersb) 

      //               // let refLR = db.collection('Load-op').doc(this.LoadId)

      //               //   refLR.get().then(docsnapshot => {

      //               //     this.curload = docsnapshot.data()
                  
      //               //      let refDC = db.collection('data-collection-op').doc(this.docidDCOp)

      //               //      refDC.update({
      //               //        // update elements in an array
      //               //        loads: firebase.firestore.FieldValue.arrayUnion( this.curload)
      //               //       }).then( () => {

      //               //         // create a new standby 
      //               //            this.newstandby(this.diggersb) 

      //               //       }).catch( err => {
      //               //         console.log(err);
                            
      //               //       })
                    
                         
                              
      //               //   } ).catch(err => {
      //               //            console.log(err);
                              
      //               //    })

      //                 console.log("the new record created successfully");
                      
      //               }).catch( err => {
      //                 console.log(err);
                      
      //               })
      //           }
      //           else
      //           {
      //             this.feedback =" Please create a new load record (from digger)"
      //           }

      //         })


      // }
      // else
      // {

      //    this.newstandby(newitem)
      // }

    }

        

  },

  created() {

      // get the activities in real-time
    
    //   let ref = db.collection('StandbySuper').doc(this.docidLoadSuper)
    
    //      ref.onSnapshot(snapshot => {
    //       this.Standbys = snapshot.data().standby 
          
    // })

     let ref = db.collection('BreakdownSuper').orderBy('comment')

       ref.onSnapshot( snapshot =>{

       		// assign the this.trucks when adding,delete or editing.we just need adding
       		snapshot.docChanges().forEach(change => {
       			
       			if(change.type =='added')
       			{
       				let doc = change.doc
       				this.Breakdowns.push(doc.data().comment)
       			}
       			if(change.type == 'removed')
       			{
       				  // nothing

       			}
       			
       		})
    })
    
    //   // get the previous laod in DC. push new load into DC
    // let refDC = db.collection('data-collection-op').doc(this.docidDCOp)

    // refDC.onSnapshot(docsnapshot => {

    //     this.datacollection = docsnapshot.data() 
         
    // })


 }

 }

 
  



</script>

<style scoped>

.right{
  margin-top:10px;
}
.col{
  margin:0px;
}



</style>