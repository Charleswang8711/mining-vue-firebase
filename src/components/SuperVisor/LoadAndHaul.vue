<template>

	<div class="container">
		
		<div class="right field">
			<router-link :to="{ name: 'SetupHome'}">
           	 	<i class="waves-effect waves-light btn-small deep-purple">Home</i>
        	</router-link>
		</div>

    <h3 class="center deep-purple-text">Load Info Setup</h3>

    <div class="card">
      <div class="card-content">
        
          <!-- <div v-if="activityif">
           <label for="activity">Activity (press enter to add)</label>
           <input type="text" name="activity" @keydown.tab.prevent="addactivity" v-model="activity">  
           <p v-if="feedback" class="red-text center">{{feedback}}</p>        
          </div> -->

          <div v-if="excavatorif">
           <label for="excavator">excavator (press enter to add)</label>
           <input type="text" name="excavator" @keydown.tab.prevent="addaexcavator" v-model="excavator">  
           <p v-if="feedback" class="red-text center">{{feedback}}</p>        
          </div>

          <div v-if="shotif">
           <label for="shot">shot (press enter to add)</label>
           <input type="text" name="shot" @keydown.tab.prevent="addshot" v-model="shot">  
           <p v-if="feedback" class="red-text center">{{feedback}}</p>        
          </div>

          

          <div v-if="materialif">
           <label for="material">material (press enter to add)</label>
           <input type="text" name="material" @keydown.tab.prevent="addmaterial" v-model="material">  
           <p v-if="feedback" class="red-text center">{{feedback}}</p>        
          </div>

          <div v-if="rlif">
           <label for="rl">reduce-level (press enter to add)</label>
           <input type="text" name="rl" @keydown.tab.prevent="addrl" v-model="rl">  
           <p v-if="feedback" class="red-text center">{{feedback}}</p>        
          </div>

           <div v-if="destinationif">
           <label for="destination">destination (press enter to add)</label>
           <input type="text" name="destination" @keydown.tab.prevent="adddestination" v-model="destination">  
           <p v-if="feedback" class="red-text center">{{feedback}}</p>        
          </div>

          <!-- <div v-if="standbyif">
           <label for="standby">standby (press enter to add)</label>
           <input type="text" name="standby" @keydown.tab.prevent="addstandby" v-model="standby">  
           <p v-if="feedback" class="red-text center">{{feedback}}</p>        
          </div>

          <div v-if="breakdownif">
           <label for="breakdown">breakdown (press enter to add)</label>
           <input type="text" name="breakdown" @keydown.tab.prevent="addbreakdown" v-model="breakdown">  
           <p v-if="feedback" class="red-text center">{{feedback}}</p>        
          </div> -->

          

       
      
      </div>
    <div class="card-tabs">
      <ul class="tabs tabs-fixed-width">
        <!-- <li class="tab"><a  class="mode" @click="activitymode">activity</a></li> -->
        <li class="tab"><a  class="mode" @click="excavatormode">excavator</a></li>
        <li class="tab"><a  class="mode" @click="shotmode">shot</a></li>
        <li class="tab"><a  class="mode" @click="rlmode">reduce-level</a></li>
        <li class="tab"><a  class="mode" @click="materialmode">material</a></li>
        <li class="tab"><a  class="mode" @click="destinationmode">destination</a></li>
        <!-- <li class="tab"><a  class="mode" @click="standbymode">standby</a></li>
        <li class="tab"><a  class="mode" @click="breakdownmode">breakdown</a></li> -->
      </ul>
    </div>
    <div class="load-content card-content grey lighten-4">

      <!-- <div v-if="activityif">
         <ul class="collection with-header">
            <li class="collection-header"><h6>Current activities</h6></li>

            <li class="collection-item" v-for="(activity, index) in load.activity" :key='index' >
              {{ activity }}
              <i class="material-icons delete" @click="deleteactivity(activity)">delete</i>
            </li>

            <li class="collection-item" v-for="(activity, index) in activities" :key='index' >
              {{ activity }}
              <i class="material-icons delete" @click="deleteactivity(activity)">delete</i>
            </li>
          </ul>
      </div> -->

      <div v-if="excavatorif">
        <ul class="collection with-header">
            <li class="collection-header"><h6>Current excavators</h6></li>
             <li class="collection-item" v-for="(excavator, index) in load.excavator" :key='index' >
              {{ excavator }}
              <i class="material-icons delete" @click="deleteexcavator(excavator)">delete</i>
            </li>

            <li class="collection-item" v-for="(excavator, index) in excavators" :key='index' >
              {{ excavator }}
              <i class="material-icons delete" @click="deleteexcavator(excavator)">delete</i>
            </li>
           

          </ul>
      </div>

       <div v-if="shotif">
        <ul class="collection with-header">
            <li class="collection-header"><h6>Current shots</h6></li>
            <li class="collection-item" v-for="(shot, index) in load.shot" :key='index' >
              {{ shot }}
              <i class="material-icons delete" @click="deleteshot(shot)">delete</i>
            </li>
            <li class="collection-item" v-for="(shot, index) in shots" :key='index' >
              {{ shot }}
              <i class="material-icons delete" @click="deleteshot(shot)">delete</i>
            </li>
            
          </ul>
      </div>
      <div v-if="rlif">
        <ul class="collection with-header">
            <li class="collection-header"><h6>Current reduced levels</h6></li>
            <li class="collection-item" v-for="(rl, index) in load.RL" :key='index' >
              {{ rl }}
              <i class="material-icons delete" @click="deleterl(rl)">delete</i>
            </li>

            <li class="collection-item" v-for="(rl, index) in rls" :key='index' >
              {{ rl }}
              <i class="material-icons delete" @click="deleterl(rl)">delete</i>
            </li>

          </ul>
      </div>
      <div v-if="materialif">
        <ul class="collection with-header">
            <li class="collection-header"><h6>Current materials</h6></li>
            <li class="collection-item" v-for="(material, index) in load.material" :key='index' >
              {{ material }}
               <i class="material-icons delete" @click="deletematerial(material)">delete</i>
            </li>
            <li class="collection-item" v-for="(material, index) in materials" :key='index' >
              {{ material }}
               <i class="material-icons delete" @click="deletematerial(material)">delete</i>
            </li>
          </ul>
      </div>
      <div v-if="destinationif">
        <ul class="collection with-header">
            <li class="collection-header"><h6>Current destinations</h6></li>
             <li class="collection-item" v-for="(destination, index) in load.destination" :key='index' >
              {{ destination }}
               <i class="material-icons delete" @click="deletedestination(destination)">delete</i>
            </li>
            <li class="collection-item" v-for="(destination, index) in destinations" :key='index' >
              {{ destination }}
               <i class="material-icons delete" @click="deletedestination(destination)">delete</i>
            </li>
          </ul>
      </div>
      <!-- <div v-if="standbyif">
        <ul class="collection with-header">
            <li class="collection-header"><h6>Current standbys</h6></li>
            <li class="collection-item" v-for="(standby, index) in load.standby" :key='index' >
              {{ standby }}
              <i class="material-icons delete" @click="deletestandby(standby)">delete</i>
            </li>

            <li class="collection-item" v-for="(standby, index) in standbys" :key='index' >
              {{ standby }}
              <i class="material-icons delete" @click="deletestandby(standby)">delete</i>
            </li>
          </ul>
      </div>
      <div v-if="breakdownif">
        <ul class="collection with-header">
            <li class="collection-header"><h6>Current breakdowns</h6></li>
            <li class="collection-item" v-for="(breakdown, index) in load.breakdown" :key='index' >
              {{ breakdown }}
              <i class="material-icons delete" @click="deletebreakdown(breakdown)">delete</i>
            </li>

            <li class="collection-item" v-for="(breakdown, index) in breakdowns" :key='index' >
              {{ breakdown }}
              <i class="material-icons delete" @click="deletebreakdown(breakdown)">delete</i>
            </li>
          </ul>
      </div> -->
         
          <form @submit.prevent="addload">
              <div class="field center">
                 <button class="btn deep-purple">Save All Setup</button>
              </div>
          </form>
  
     </div>
   </div>



  </div>

     


	    

	 

	

	

</template>


<script>

import db from '@/firebase/init'


export default {
	name: 'Load',
  props: ['loadid'],
	data()
	{
		return {
      load:null,

      // for input new items
      activity: null,
      // for add new items
      activities:[],
      // for concatenate the prviouse info and new items
      concatactivities:[],
      activityif:false,

			excavator:null,
      excavators:[],
      concatexcavators:[],
      excavatorif:false,

      shot:null,
      shots:[],
      concatshots:[],
      shotif:false,

      rl:null,
      rls:[],
      concatrls:[],
      rlif:false,
      
      material:null,
      materials:[],
      concatmaterials:[],
      materialif:false,

      destination:null,
      destinations:[],
      concatdestinations:[],
      destinationif:false,


      // standby:null,
      // standbys:[],
      // standbyif:false,
      // breakdown:null,
      // breakdowns:[],
      // breakdownif:false,

      feedback:null


		}

	},
	methods: {

    //add the items
    // we just add the fields properties to the doc domain. NOT add a new doc. So at this moment
    // we don`t manipulate the database,just add new items in this component
    addactivity(){


    
        
       if(this.activity){
        this.activities.push(this.activity)
        this.activity = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a value to add another activity'
      }
    },
    addaexcavator(){

      if(this.excavator){
        this.excavators.push(this.excavator)
        this.excavator = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a value to add another excavator'
      }

    },
    addshot(){

      if(this.shot){
        this.shots.push(this.shot)
        this.shot = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a value to add another shot'
      }

    },
    addrl(){

      if(this.rl){
        this.rls.push(this.rl)
        this.rl = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a value to add another rl'
      }

    },
    addmaterial(){

      if(this.material){
        this.materials.push(this.material)
        this.material = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a value to add another material'
      }

    },
    adddestination(){

      if(this.destination){
        this.destinations.push(this.destination)
        this.destination = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a value to add another destination'
      }

    },
    // addstandby(){

    //   if(this.standby){
    //     this.standbys.push(this.standby)
    //     this.standby = null
    //     this.feedback = null
    //   } else {
    //     this.feedback = 'You must enter a value to add another standby'
    //   }

    // },
    // addbreakdown(){

    //   if(this.breakdown){
    //     this.breakdowns.push(this.breakdown)
    //     this.breakdown = null
    //     this.feedback = null
    //   } else {
    //     this.feedback = 'You must enter a value to add another breakdown'
    //   }

    // },

    /// we just delete the fields properties to the doc domain. NOT delete a new doc. So at this moment
    // we don`t manipulate the database,just delete new items in this component

    deleteactivity(id){

    
        
       let ref = db.collection('load-haul-surper').doc(this.loadid)

       ref.get().then( docsnapshot => {

        let doc = docsnapshot.ref
        this.load.activity = this.load.activity.filter( item =>{
        return item != id   })
       
        doc.update({
          activity:this.load.activity
        }).then( () => {
          // do nothing
  
        }).catch( err => {
          console.log(err);
        } )  

        })
       // for delete the new activity
       this.activities = this.activities.filter( item =>{
        return item != id })

      },

    deleteexcavator(id){


   
        
       let ref = db.collection('load-haul-surper').doc(this.loadid)

       ref.get().then( docsnapshot => {

        let doc = docsnapshot.ref

        this.load.excavator = this.load.excavator.filter( item =>{
        return item != id   })
     
        doc.update({
          excavator:this.load.excavator
        }).then( () => {
          // do nothing
  
        }).catch( err => {
          console.log(err);
        } )  

        })

        this.excavators = this.excavators.filter( item =>{
        return item != id
        })
      },
    deleteshot(id){

     
        
       let ref = db.collection('load-haul-surper').doc(this.loadid)

       ref.get().then( docsnapshot => {

        let doc = docsnapshot.ref

        this.load.shot = this.load.shot.filter( item =>{
        return item != id   })
       
        doc.update({
          shot:this.load.shot
        }).then( () => {
          // do nothing
  
        }).catch( err => {
          console.log(err);
        } )  

        })


        this.shots = this.shots.filter( item =>{
        return item != id
        })
      },

    deleterl(id){

    
        
       let ref = db.collection('load-haul-surper').doc(this.loadid)

       ref.get().then( docsnapshot => {

        let doc = docsnapshot.ref

        this.load.RL = this.load.RL.filter( item =>{
        return item != id   })
       
        doc.update({
          RL:this.load.RL
        }).then( () => {
          // do nothing
  
        }).catch( err => {
          console.log(err);
        } )  

        })

        this.rls = this.rls.filter( item =>{
        return item != id
        })
      },

      deletematerial(id){

      
        
       let ref = db.collection('load-haul-surper').doc(this.loadid)

       ref.get().then( docsnapshot => {

        let doc = docsnapshot.ref

        this.load.material = this.load.material.filter( item =>{
        return item != id   })
       
        doc.update({
          material:this.load.material
        }).then( () => {
          // do nothing
  
        }).catch( err => {
          console.log(err);
        } )  

        })

        this.materials = this.materials.filter( item =>{
        return item != id
        })
      },

       deletedestination(id){

        
        
       let ref = db.collection('load-haul-surper').doc(this.loadid)

       ref.get().then( docsnapshot => {

        let doc = docsnapshot.ref

        this.load.destination = this.load.destination.filter( item =>{
        return item != id   })
       
        doc.update({
          destination:this.load.destination
        }).then( () => {
          // do nothing
  
        }).catch( err => {
          console.log(err);
        } )  

        })

        this.destinations = this.destinations.filter( item =>{
        return item != id
        })
      },

      //   deletestandby(id){

   
        
      //  let ref = db.collection('load-haul-surper').doc(this.loadid)

      //  ref.get().then( docsnapshot => {

      //   let doc = docsnapshot.ref

      //   this.load.standby = this.load.standby.filter( item =>{
      //   return item != id   })
       
      //   doc.update({
      //     standby:this.load.standby
      //   }).then( () => {
      //     // do nothing
  
      //   }).catch( err => {
      //     console.log(err);
      //   } )  

      //   })

      //   this.standbys = this.standbys.filter( item =>{
      //   return item != id
      //   })
      // },
      //   deletebreakdown(id){

   
        
      //  let ref = db.collection('load-haul-surper').doc(this.loadid)

      //  ref.get().then( docsnapshot => {

      //   let doc = docsnapshot.ref

      //   this.load.breakdown = this.load.breakdown.filter( item =>{
      //   return item != id   })
       
      //   doc.update({
      //     breakdown:this.load.breakdown
      //   }).then( () => {
      //     // do nothing
  
      //   }).catch( err => {
      //     console.log(err);
      //   } )  

      //   })


      //   this.breakdowns = this.breakdowns.filter( item =>{
      //   return item != id
      //   })
      // },

      concat()
      {


        if(this.load.hasOwnProperty('activity'))
        {


            
            this.concatactivities = this.load.activity.concat(this.activities)
         
          
        }
        else
        {
              this.concatactivities = this.activities
        }
        
        if(this.load.hasOwnProperty('excavator'))
        {
          

            this.concatexcavators = this.load.excavator.concat(this.excavators)

         
        }
        else
        {
          this.concatexcavators = this.excavators

        }
         if(this.load.hasOwnProperty('shot'))
        {
         

            this.concatshots = this.load.shot.concat(this.shots)

         
        }
        else
        {
          this.concatshots = this.shots

        }
         if(this.load.hasOwnProperty('RL'))
        {
          

            this.concatrls = this.load.RL.concat(this.rls)

        
        }
        else
        {
            this.concatrls = this.rls

        }
         if(this.load.hasOwnProperty('material'))
        {
          

            this.concatmaterials = this.load.material.concat(this.materials)

          
         
        }
        else
        {
          this.concatmaterials = this.materials

        }
         if(this.load.hasOwnProperty('destination'))
        {
          

            this.concatdestinations = this.load.destination.concat(this.destinations)

         
        }
        else
        {
          this.concatdestinations = this.destinations
        }
        
      

      },

		addload(){
      // supervisor
        
          this.concat()
          // create a new data-collection-op
          let ref = db.collection('load-haul-surper').doc(this.loadid)
          ref.get().then( docsnapshot =>{
            
            if(docsnapshot.exists)
            {
            // merging new field into the "load-haul-super" collection

            this.feedback = null
            ref.set(
              {
                activity: this.concatactivities,
                excavator: this.concatexcavators,
                shot:this.concatshots,
                RL: this.concatrls,
                material: this.concatmaterials,
                destination: this.concatdestinations,
                // standby: this.standbys,
                // breakdown: this.breakdowns
              },
              {merge: true}).then(() =>{ 

                this.$router.push({ name: 'SetupHome'})
              })
            }
            else
            {
              this.feedback = "the shift doesn`t exists, please create a shift firstly"
            }

          })

    },
    activitymode(){
      this.activityif = true
      this.excavatorif = false
      this.shotif = false
      this.rlif = false
      this.materialif = false
      this.destinationif = false 
      // this.standbyif = false 
      // this.breakdownif = false 
    },
    excavatormode(){
      this.activityif = false
      this.excavatorif = true
      this.shotif = false
      this.rlif = false
      this.materialif = false
      this.destinationif = false 
      // this.standbyif = false 
      // this.breakdownif = false 
    },
    shotmode(){
      this.activityif = false
      this.excavatorif = false
      this.shotif = true
      this.rlif = false
      this.materialif = false
      this.destinationif = false 
      // this.standbyif = false 
      // this.breakdownif = false 
    },
    rlmode(){
      this.activityif = false
      this.excavatorif = false
      this.shotif = false
      this.rlif = true
      this.materialif = false
      this.destinationif = false 
      // this.standbyif = false 
      // this.breakdownif = false 
    },
    materialmode(){
      this.activityif = false
      this.excavatorif = false
      this.shotif = false
      this.rlif = false
      this.materialif = true
      this.destinationif = false 
      // this.standbyif = false 
      // this.breakdownif = false 
    },
    destinationmode(){
      this.activityif = false
      this.excavatorif = false
      this.shotif = false
      this.rlif = false
      this.materialif = false
      this.destinationif = true 
      // this.standbyif = false 
      // this.breakdownif = false 
    },
    // standbymode(){
    //   this.activityif = false
    //   this.excavatorif = false
    //   this.shotif = false
    //   this.rlif = false
    //   this.materialif = false
    //   this.destinationif = false 
    //   // this.standbyif = true 
    //   // this.breakdownif = false 
    // },
    // breakdownmode(){
    //   this.activityif = false
    //   this.excavatorif = false
    //   this.shotif = false
    //   this.rlif = false
    //   this.materialif = false
    //   this.destinationif = false 
    //   this.standbyif = false 
    //   this.breakdownif = true 
    // }



		

	},
	created(){


        
        
     console.log(this.loadid);
      
       // the specific one doc
       let ref = db.collection('load-haul-surper').doc(this.loadid)
       // ref is a doc,if you want get the content of the doc.
       // 1, get the docsnapshot using the get() method
       // 2, docsnapshot.data()
       ref.get().then(docsnapshot => {
          
      
        // docsnapshot is a documentsnapshot
        this.load = docsnapshot.data()
        
          

       })

    

      

       

	}
}

	


</script>

<style>

.mode {
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;

}


.delete {
 
  margin-left:550px;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}


</style>