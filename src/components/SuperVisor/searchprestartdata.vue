<template>

<div>

   <div class="right field" style="margin-right:20px;">
			<router-link :to="{ name: 'SetupHome'}">
           	 	 <i class="deep-purple btn-small ">Home</i>
        	</router-link>
		</div>

  <div class="container" style="margin-top:20px;">

   
  
   <form class="col s12 card-panel" style="padding:10px;" @submit.prevent="searchbar">

    <div class="section" >

       <div class="field center deep-purple-text">
       	<h6>Search Pre Start</h6>
       </div>



      <div class="row field center">
        <div class="col s12 m6 l3">
          <i class=" btn-small " @click="Selshift('day')">Day</i>
        </div>
        <div class="col s12 m6 l3">
          <i class=" btn-small " @click="Selshift('night')">night</i>
        </div>
        <div class="col s12 m6 l3">
          <i class=" btn-small " @click="Selshift('dayandnight')">Day and Night</i>
        </div>

      </div>

     

      <div class="row field center">

        <div class="col s12 m6 l3">

          <i class=" btn-small " @click="Selday(daybefore)">{{daybefore}}</i>
            
        </div>

        <div class="col s12 m6 l3">

          <i class=" btn-small " @click="Selday(today)">{{today}}</i>
            
        </div>

        <div class="col s12 m6 l3">

          <i class=" btn-small " @click="Selday(dayafter)">{{dayafter}}</i>
            
        </div>

      
      </div>


       <!-- <div class="row">
        
        <div class="input-field col s12 m12 l12 ">
          <input  id="Opname" type="text" class="validate" v-model="Opname">
          <label for="Opname">Operator Name</label>
        </div>
       </div>

       <div class="row">
        <div class="input-field col s12 m12 l12 ">
          <input  id="MachineNo" type="text" class="validate" v-model="MachineNo">
          <label for="MachineNo">Machine No</label>
        </div>
       </div> -->

    </div>

    <div class="divider"></div>

     <p v-if="feedback" class="red-text center">{{feedback}}</p>

      <div class="field center" style="margin-top:10px;">
				<button class="btn deep-purple">Search </button>
			</div>

    </form>

    </div>

    

 <!-- <form @submit.prevent="searchbyoperator">

  <div class="row">
      <div class="col s12">Please iuput operator:</div>
       
      <input type="text" name="name" v-model="name">
   
      <div class="field center">
        <button class="btn deep-purple">Search By Operator</button>
      </div>
  </div>

 </form> -->
  

</div>
</template>

<script>

import db from '@/firebase/init'
import firebase from 'firebase'

import moment from 'moment'

export default {

  name: 'searchprestartdata',
  data () {
    return {
      predatacollections:[],

      searchpredatas:[],

      // name:null,
      date:null,
      selectshift:null,
      selectday:null,
      daybefore: moment(new Date()).subtract(1,'days').format('Do'),
      today: moment(Date.now()).format("Do"),
      dayafter: moment(new Date()).add(1,'days').format('Do'),
      feedback:null

    }
  },
  methods: {

     Selday(day){
         this.selectday = day
     },
     Selshift(shift){
         this.selectshift = shift
     },
     searchbar(){

       if(this.selectshift && this.selectday)
       {

       

        this.$router.push({ name: 'showprestartdata', 
         params:{shift:this.selectshift,day:this.selectday}})



       }
       else if(this.selectshift)
       {

            this.feedback = " Please select date "


       }
      else if(this.selectday)
      {
          this.feedback = " Please select shift "
      }
      else
      {
          this.feedback = " Please select shift and day "

      }



     




    }

    // searchbydate(){

    //   if(this.date && this.shift)
    //   {
    //     this.feedback = null
    //     let datetrans = moment(this.date).format('lll')
    //     this.datacollection = this.datacollection.filter( dataitem =>{

    //       return (dataitem.shift == this.shift && dataitem.date == datetrans)

    //     })

    //   }
    //   else
    //   {
    //       this.feedback = "Please fill in shift and date items"

    //   }
    // },
    // searchbyoperator(){

    //   if(this.name)
    //   {
    //     this.feedback = null
    //     this.datacollection = this.datacollection.filter( dataitem =>{

    //       return dataitem.name == this.name

    //     })

    //   }
    //   else
    //   {
    //       this.feedback = "Please fill in operator name"

    //   }


    // }

  }
  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


</style>
