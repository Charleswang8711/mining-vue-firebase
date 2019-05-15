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
       	<h5>Search Bar</h5>
      </div>

      <div class="field left deep-purple-text">
       	<h6>Shift:</h6>
       </div>

      <div class="row field center">
        <div class="col s12 m6 l3">
          <i class=" btn-small " @click="Selshift('Day')">Day</i>
        </div>
        <div class="col s12 m6 l3">
          <i class=" btn-small " @click="Selshift('Night')">night</i>
        </div>
        <div class="col s12 m6 l3">
          <i class=" btn-small " @click="Selshift('dayandnight')">Day and Night</i>
        </div>

      </div>

      <div class="field left deep-purple-text">
       	<h6>Date:</h6>
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
  
  
    <div class="card-panel" style="margin:30px;">
      <table>
          <thead>
            <tr>
                <th>Operator</th>
                <th>Truck ID</th>
                <th>Shift</th>
                <th>Date</th>
                <th>Activity</th>
                <th>Comment</th>
                <th>Load Time</th>
                <th>Dig Unit</th>   
                <th>RL</th>
                <th>Shot Number</th>
                <th>Material</th>
                <th>Destination</th>
                <th>End Time</th>
                <th>Cycle Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for=" dataitem in searchcol" :key="dataitem.id">
                <td>{{dataitem.username}}</td>
                <td>{{dataitem.truckNum}}</td>
                <td>{{dataitem.shift}}</td>
                <td>{{dataitem.date.substr(0,2)}}/{{dataitem.month}}/{{dataitem.year}}</td>
                <td>{{dataitem.Activity}}</td>
                <td>{{dataitem.Comment}}</td>
                <td>{{dataitem.LoadTime}}</td>
                <td>{{dataitem.DigUnit}}</td>
                <td>{{dataitem.RL}}</td>
                <td>{{dataitem.Shot}}</td>
                <td>{{dataitem.Material}}</td>
                <td>{{dataitem.Destination}}</td>
                <td>{{dataitem.EndTime}}</td>
                <td>{{dataitem.CycleTime}}</td>
              
            </tr>
          </tbody>
        </table>

        </div>
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
  // components: { DatePicker,VueSingleSelect },
  data () {
    return {
      datacollections:[],

      searchcol:[],

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

  
       if(this.selectday && (this.selectshift != 'dayandnight'))
       {
             
         this.searchcol = this.datacollections.filter( dataitem =>{
          
          return (dataitem.shift == this.selectshift && this.selectday == dataitem.date )

        })

       

       }
       else if(this.selectshift == 'dayandnight')
       {

          this.searchcol = this.datacollections.filter( dataitem =>{

          return ( this.selectday == dataitem.date )

        })

       }
       else if(this.selectshift)
       {

          this.feedback = " Please select date "
          return 0

       }
      else if(this.selectday)
      {
          this.feedback = " Please select shift "
          return 0
      }
      else
      {
          this.feedback = " Please select shift and day "
          return 0

      }



     




    }
  },
  
     

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


  created(){

       // get the data based on  the specified shift and date
       //let ref = db.collection('data-collection-op').where('shift', '==', this.shift).where('date', '==', this.date)

       // get all the info from a collection, we can use onSnapshot()
       // do we need to capture the data in real-time

       let refdc = db.collection('operator-DC').orderBy('date')
       
         refdc.onSnapshot(snapshot => {
          
        //  snapshot.docChanges (version 4.12/4.13)
        //  snapshot.docChanges() (version 5.0.0 & up)
      snapshot.docChanges().forEach(change => {

        if(change.type == 'added')
        {
          let doc = change.doc
        
          //this.datacollection.unshift(itme), put the item into the start of the array.
          // this.datacollection.push(item),
           let dataitem = doc.data()
          dataitem.id = doc.id  // get id for iterating through the loads
          this.datacollections.push(dataitem)

        }
      })
    })

    this.searchcol = this.datacollections

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.DC{

  margin: 0px,20px;


}


</style>
