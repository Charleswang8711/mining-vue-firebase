<template>

	<div class="container">

		<h2 class="center deep-purple-text">SMS Operation Platform</h2>
      <p v-if="feedback" class="red-text center">{{feedback}}</p>
    <div class="divider"></div>
  		
  		
  		<div class="section">
			 <h5 class=" center deep-purple-text" style="margin-bottom: 20px;">Select Activity</h5>
   		    <div class="row" style="margin-top:20px">
      			<div class="col s12 m4 l3 ">
      				<!-- <router-link :to="{ name: 'HomeOp',params:{ docidDCOp : docidDCOp, docidLoadSuper: docidLoadSuper}}"> -->
           	 			<i class=" load waves-effect waves-light btn-large " @click="addDC('load')">Load and haul</i>
        			<!-- </router-link> -->
      			</div>
      			<div class="col s12 m4 l3">
      				   
           	 			<i class="waves-effect waves-light btn-large " @click="addDC('standby')">Standby</i>
        			
      			</div>
      			<div class="col s12 m4 l3">
      					
           	 		<i  class="waves-effect waves-light btn-large " @click="addDC('breakdown')">Breakdown</i>
        			
      			</div>

				  <div class="col s12 m4 l3">
      					
           	 		<i  class="waves-effect waves-light btn-large " @click="addDC('dayworks')">Day works</i>
        			
      			</div>

				<div class="col s12 m4 l3">
      					
           	 		<i  class=" load waves-effect waves-light btn-large " @click="addDC('endshift')">End of shift</i>
        			
      			</div>
  			</div>


			  

			    <Dayworks :show="showModal" @close="savecomment"></Dayworks>

				<vue-up> </vue-up>
               

   		    	
      	
	

		</div>
		

	</div>
	


</template>

<script >

import db from "@/firebase/init"
import firebase from 'firebase'
import moment from 'moment'
import slugify  from 'slugify'
import Dayworks  from './Dayworks'

export default {
  name: 'HomeOp',
  props: ['shift','date','truckNum','month','year','username','docidLoadSuper','PreStartID'],

  components:{ Dayworks},

  data () {
    return {

      slug:null,
	  feedback:false,
	  showModal: false,
	  CurTime: moment(Date.now()).format('LTS'),
	  dayworksId:null,
	  commentrun:false

    }
  },
  methods: {

	 newcomment(newitem)
    {

	
		newitem = slugify(
				newitem, {
         		replacement: '-',
          		remove: /[$*_+~.()'"!\-:@]/g,
          		lower: true
				})

         let refdaywork = db.collection('operator-DC').doc(this.CurTime)

        refdaywork.set({

          shift: this.shift,
		  date: this.date,
		 truckNum: this.truckNum,
		 username: this.username,
		 month: this.month,
		 year: this.year,
                       
         Activity:"Day Works",
        // this is one and only, it is unique
         LoadTime:this.CurTime,
         Comment:newitem

        }).then(() => {

		  this.dayworksId = this.CurTime
		  this.commentrun = true
          console.log("the new day works record created successfully");
          

       }).catch(err => {
             console.log(err)
         })


	},
	endcomment(){

		  let refdaywork = db.collection('operator-DC').doc(this.dayworksId)

              refdaywork.get().then( docsnapshot =>{

                if(docsnapshot.exists)
                {
                    let refdoc = docsnapshot.ref

                    refdoc.set({
                       
                    EndTime: this.CurTime,
                    CycleTime: '10mins'
                    
                    // this.curtime - loadid

                  },{merge : true}).then(() => {

					    // do nothing


                        }).catch(err => {
                       console.log(err)
                      })
                    
                   console.log("the new dayworks record created successfully");

                }
                else
                {
                    this.feedback =" Please create a new dayworks record"

                }


              })


	}, 
	savecomment(comment){
		 
		 // get comment from the child component and create a new dayworks commment
		 console.log(comment);
		 
		this.newcomment(comment)
		 
		 this.showModal = false

		 this.$popup({
    				message         :  '',
    				color           : '#ffcc00',
    				backgroundColor : 'rgba(255,0,0,0.2)',
    				delay           :  0
          			})
	 },
	
  	addDC(newitem){
            this.slug = slugify(
			    	newitem, {
         		replacement: '-',
          		remove: /[$*_+~.()'"!\-:@]/g,
          		lower: true
        		})

              	if( this.slug == "load")
              	{
                  // we do not create the load here, when the operator choose the load. we will enter into a load cycle which is beginning with dig unit and end with destination
                // }
				  // just for traveling to DigUnit
				  if(this.commentrun)
				  {
                      this.endcomment()
				  }
				
                  this.$router.push({ name: 'DigUnit', 
                                    params:{ PreStartID:this.PreStartID,shift: this.shift,date: this.date,truckNum: this.truckNum,month: this.month, year: this.year,username: this.username,docidLoadSuper : this.docidLoadSuper,from:'Home'}})
           

              	}
              	else if( this.slug == "standby")
              	{
					if(this.commentrun)
				  {
                      this.endcomment()
				  }
              		this.$router.push({ name: 'Standby', 
                	params:{ PreStartID:this.PreStartID,shift: this.shift,date: this.date,truckNum: this.truckNum,month: this.month, year: this.year,username: this.username, docidLoadSuper : this.docidLoadSuper}})

              	}
              	else if( this.slug == "breakdown")
              	{
					if(this.commentrun)
				  {
                      this.endcomment()
				  }
              		this.$router.push({ name: 'Breakdown', 
                	params:{ PreStartID:this.PreStartID,shift: this.shift,date: this.date,truckNum: this.truckNum,month: this.month, year: this.year,username: this.username, docidLoadSuper : this.docidLoadSuper}})

				}
				else if(this.slug == "dayworks")
				{
					this.showModal = true
					// backcolor is red 

					this.$popup({
    				message         :  '',
    				color           : '#ffcc00',
    				backgroundColor : 'rgba(255,0,0,0.2)',
    				delay           :  400000
          			})
				}
				else
				{  
				  if(this.commentrun)
				  {
                      this.endcomment()
				  }
					this.$router.push({ name: 'Endshift', 
                	params:{ PreStartID:this.PreStartID,shift: this.shift,date: this.date,truckNum: this.truckNum,month: this.month, year: this.year,username: this.username, docidLoadSuper : this.docidLoadSuper}})
				}


           


  	}

  	

  },

  created() {

  		// get the activities in real-time
  	
  	// 	let ref = db.collection('load-haul-surper').doc(this.docidLoadSuper)
       
    //      ref.onSnapshot(snapshot => {
    //       this.activities = snapshot.data().activity 
        
    //      if(this.activities[0]) 
    //      {
    //      	this.act1 = true
    //      }
    //       if(this.activities[1]) 
    //      {
    //      	this.act2 = true
    //      }
    //       if(this.activities[2]) 
    //      {
    //      	this.act3 = true
    //      }
    // })

        




 }

 }

 
	



</script>

<style scoped>

.col{
	margin-bottom: 10px;

}
.load{
	padding: 0px 10px;
}



</style>