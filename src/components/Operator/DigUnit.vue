<template>

  
   <div class="container">
    <h2 class="center deep-purple-text">SMS Operation Platform</h2>

    <div class="right field">
      <router-link :to="{ name: 'HomeOp',params:{shift: this.shift,date: this.date,truckNum: this.truckNum,month: this.month, year: this.year,username: this.username ,PreStartID : this.PreStartID, docidLoadSuper : this.docidLoadSuper}}">
              <i class="deep-purple btn-small ">Home</i>
          </router-link>
    </div>

 
  
             <div class="divider"></div>
             <div class="section">
                  <h5 class="left deep-purple-text" style="margin:20px;">Dig Unit</h5>
                    <h5 class="right deep-purple-text" style="margin:20px;">Standby</h5>
                  <div  class="row" style="margin :0px;"> 

                    <div class="col s12 m8 l9" style="margin:0px;">

                      <div class="row" style="margin:0px;">

                       <div class="col s12 m4 l3" style="margin:0px" v-for="(digger,index) in DigUnits" :key="index">
              <!-- <router-link :to="{ name: 'HomeOp',params:{ docidDCOp : docidDCOp, docidLoadSuper: docidLoadSuper}}"> -->
                         <i class="waves-effect waves-light btn-large " @click="addLoad(digger)">{{digger}}</i>

                          

                   <!-- </router-link> -->
                      </div>


                    </div>



                  </div>
                
                  <div class="col s12 m4 l3 right field" style="margin:0px;">

                      <div class="col" v-for="(standby,index) in Standbys" :key="index">
                          <i class=" btn-small " @click="gotostandby(standby)">{{standby}}</i>
                      </div>
                  
                    </div>
                  

           </div>
           </div>

            

          <div class="divider"></div>

          <div class="section">

          <P style=" color: red; ">Current Path:</P>
          <p>Activity --></p>
          <p>Load and Haul --></p>

          
           <div class="right field" style="margin-top:20px;" >
             <i class="deep-purple btn-small" style="margin-right:-8px;" @click="gotoload()">Load</i>
           </div>

          </div>


        <div class="divider"></div>

          <div class="section">

          <p v-if="feedback" class="red-text center">{{feedback}}</p>

          <!-- <div class="left field">
            <router-link :to="{ name: 'HomeOp',params:{PreStartID : this.PreStartID,docidLoadSuper :docidLoadSuper}}">
             <i class="small  material-icons">arrow_back</i>
              
           </router-link>
          </div> -->

          

         </div>

         

         
         

			  <vue-up> </vue-up>


    </div>


</template>

<script >

import db from "@/firebase/init"
import firebase from 'firebase'
import moment from 'moment'





export default {
  name: 'DigUnit',
  props: ['shift','date','truckNum','month','year','username','docidLoadSuper','LoadId','from','PreStartID'],
 
 

  data () {
    return {

      // datacollection:[],
      // concatload:[],
      DigUnits:null,
      CurTime: moment(Date.now()).format('LTS'),
      // curload:[],
      curload:null,
      curstandby:null,
      Standbys:[],
      feedback:null,
      standbysel:null,
      frompopup:false
    
     
      
    }
  },

  methods: {
    gotostandby(newitem)
    {
       
       
      //     this.$router.push({ name: 'Standby', 
      //  params:{ LoadId : this.LoadId,docidLoadSuper : this.docidLoadSuper,from:'digger',diggersb : newitem,shift: this.shift,date: this.date,truckNum: this.truckNum,month: this.month, year: this.year,username: this.username}})
     
      this.$popup({
    		message         :  "STANDBY FOR"+'  '+newitem.toUpperCase(),
    		color           : '#ffcc00',
    		backgroundColor : 'rgba(255,0,0,0.2)',
    		delay           :  400000
            })

      this.frompopup = false

      // save load and then start a new standby cycle
      this.saveloadthenstandby(newitem)
    
    
    },
    gotoload()
    {
        // clear the standby popup
        this.$popup({
    		message         : '',
    		color           : '#ffcc00',
    		backgroundColor : 'rgba(255,0,0,0.2)',
    		delay           :  0
            })
        
        // go to load from standby
        this.frompopup = true
    

    },

    saveloadthenstandby(newitem)
    {
        // this.from = destination

            let refLR = db.collection('operator-DC').doc(this.LoadId)
 
            refLR.get().then( docsnapshot => {

                if(docsnapshot.exists)
                {
                    // set the endtime and cycletime into the this doc
                    let docref = docsnapshot.ref
                    docref.set(
                      {
                        EndTime: this.CurTime,
                        CycleTime: '10mins'      
                      },
                      {merge:true}
                    ).then(() => {

                      // get the current new load

                      this.newstandby(newitem) 

                      console.log("the new record created successfully");
                      
                    }).catch( err => {
                      console.log(err);
                      
                    })
                }
                else
                {
                  this.feedback =" Please create a new load record (to destination)"
                }

              })

    },

    newstandby(newitem)
    {

         let refstandby = db.collection('operator-DC').doc(this.CurTime)

        refstandby.set({

          shift: this.shift,
					date: this.date,
					truckNum: this.truckNum,
					username: this.username,
					month: this.month,
					year: this.year,
                       
         Activity:"standby",
        // this is one and only, it is unique
         LoadTime:this.CurTime,
         Comment:newitem

        }).then(() => {

            console.log("the new record created successfully");
          

       }).catch(err => {
             console.log(err)
         })


    },

  
    newload(newitem)
    {
         let loadref = db.collection('operator-DC').doc(this.CurTime)

        loadref.set({

          shift: this.shift,
					date: this.date,
					truckNum: this.truckNum,
					username: this.username,
					month: this.month,
					year: this.year,
                       
         Activity:"load-and-haul",
        // this is one and only, it is unique
         LoadTime:this.CurTime,
         DigUnit:newitem

        }).then(() => {

         this.$router.push({ name: 'RL', 
       params:{PreStartID : this.PreStartID, LoadId : this.CurTime,docidLoadSuper : this.docidLoadSuper,shift: this.shift,date: this.date,truckNum: this.truckNum,month: this.month, year: this.year,username: this.username}})

       }).catch(err => {
             console.log(err)
         })


    },

    addLoad(newitem)
    {
            
            // get the TimerId.
            // If the current time exists in the load record, it is a TimerId
            // if it does not exist, the current time is the end of the timer

          if(this.from == 'Home')
          {
            // create a new load record directly
            this.newload(newitem)               

          }
          else if(this.from == 'RL')
          {
            // delete the previouse one. create a new one again
             db.collection('operator-DC').doc(this.LoadId).delete()
             .then( () => {

                this.newload(newitem)   

             }).catch( (err) => {
               console.log(err);
               
             })
             


          }
          else if( this.from == 'destination' )
          {

            // this.from = destination

            let refLR = db.collection('operator-DC').doc(this.LoadId)

            console.log(this.LoadId);
            

            refLR.get().then( docsnapshot => {

                if(docsnapshot.exists)
                {
                    // set the endtime and cycletime into the this doc
                    let docref = docsnapshot.ref
                    docref.set(
                      {
                        EndTime: this.CurTime,
                        CycleTime: '10mins'      
                      },
                      {merge:true}
                    ).then(() => {

                      // get the current new load

                      this.newload(newitem) 

                      console.log("the new record created successfully");
                      
                    }).catch( err => {
                      console.log(err);
                      
                    })
                }
                else
                {
                  this.feedback =" Please create a new load record (to destination)"
                }

              })

          }
          else if( this.from == 'standbypage' || this.from == 'breakdownpage' || this.frompopup )
          {
              // save the current standby
              

              let refstandby = db.collection('operator-DC').doc(this.LoadId)

              refstandby.get().then( docsnapshot =>{

                if(docsnapshot.exists)
                {
                    let refdoc = docsnapshot.ref

                    refdoc.set({
                       
                    EndTime: this.CurTime,
                    CycleTime: '10mins'
                    
                    // this.curtime - loadid

                  },{merge : true}).then(() => {

                    this.newload(newitem) 

                        }).catch(err => {
                       console.log(err)
                      })
                    
                   console.log("the new record created successfully");

                }
                else
                {
                    this.feedback =" Please create a new standby record"

                }


              })

               

          }
          else
          {

            // do nothing
          }

           
               
      
    }


       
          
          


   

    // delLoad(){

    //     // get a querysnapshot, Since we don`t have doc id,we just have attribute key
    //     let ref = db.collection('Load-op').where('LoadTime', '==', this.TimerId)

    //     ref.get().then( querysnapshot => {
    //       querysnapshot.forEach( docsnapshot => {

    //         let docreference =  docsnapshot.ref
    //         docreference.delete().then(() => {
    //           this.$router.push({ name: 'HomeOp', 
    //               params:{ docidDCOp : this.docidDCOp, docidLoadSuper : this.docidLoadSuper,TimerId: null}})
    //         }).catch( err => {
    //           console.log(err)
    //         })
           
    //       })
    //     })
    //   }

    

  },

  created() {

      // get the excavator from supervisor backend in real-time
    
      let ref = db.collection('load-haul-surper').doc(this.docidLoadSuper)
      
         ref.onSnapshot(docsnapshot => {
          this.DigUnits = docsnapshot.data().excavator 
         
    })

     let refstandbys = db.collection('StandbySuper').orderBy('comment')

       refstandbys.onSnapshot( snapshot =>{

       		// assign the this.trucks when adding,delete or editing.we just need adding
       		snapshot.docChanges().forEach(change => {
       			
       			if(change.type =='added')
       			{
       				let doc = change.doc
       				this.Standbys.push(doc.data().comment)
       			}
       			if(change.type == 'removed')
       			{
       				  // nothing

       			}
       			
       		})
    })
    
    //  // get the previous laod in DC. push new load into DC
    // let refDC = db.collection('data-collection-op').doc(this.docidDCOp)

    // refDC.onSnapshot(docsnapshot => {

    //     this.datacollection = docsnapshot.data() 
         
    // })



   

   


 }

 }

 
  



</script>

<style scoped >

.right{
  margin-top:10px;
}
.col{
  margin-bottom: 10px;
}
p{
   margin:0px;
}




</style>