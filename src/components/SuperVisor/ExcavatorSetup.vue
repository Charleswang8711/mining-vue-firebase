<template>
	<div class="container">
		
		<div class="right field">
			<router-link :to="{ name: 'SetupHome'}">
           	 	<i class="waves-effect waves-light btn-small deep-purple">Home</i>
        	</router-link>
		</div>

	    <h3 class="center deep-purple-text">Excavator Setup</h3>
	    

  	    <div class="section">
  	    <h5 class="h5 left deep-purple-text">Add Excavator</h5>

  	
      	<form class="card-panel" @submit.prevent="addexcavator">
      		
      		<input type="text" placeholder="Enter a excavatorID .." name="excavatorID" v-model="excavatorID">
      		
      		<input type="text" placeholder="Enter a excavator DigRate .." name="excavatorDigRate" v-model="excavatorDigRate">

			<input type="text" placeholder="Enter a cost .." name="cost" v-model="excavatorCost">

      		<p v-if="feedback" class="red-text center">{{feedback}}</p>

      		<div class="field center">
				<button class="btn deep-purple">submit </button>
			</div>

      	</form>

      	</div>
     

	  <div class="divider"></div>
  		<div class="section">
        <h5 class="left deep-purple-text">Current Excavators</h5>
      	<table>
          <thead>
            <tr>
                <th>Excavator ID</th>
                <th>Excavator Dig Rate</th>
				<th>Cost /hour</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="excavator in excavators" :key="excavator.excavatorID">
                <td>{{excavator.excavatorID}}</td>
                <td>{{excavator.excavatorDigRate}}</td>
				<td>{{excavator.excavatorCost}}</td>
                <td>  <i class="material-icons delete" @click="deleteexcavator(excavator.excavatorID)">delete</i></td>
            </tr>
          </tbody>
        </table>

    	</div>

      	
   
      	
	</div>
	

</template>


<script>

import db from '@/firebase/init'

export default {
	name: 'ExcavatorSetup',
	data()
	{
		return {
			excavatorID: null,
			excavatorDigRate: null,
			excavatorCost: null,
			excavators:[],
			feedback:null

		}

	},
	methods: {

		addexcavator(){
			if(this.excavatorID && this.excavatorDigRate && this.excavatorCost)
			{
				this.feedback = null

				let ref = db.collection('ExcavatorInfo').doc(this.excavatorID)
				ref.get().then( docsnapshot => {
				if(docsnapshot.exists)
				{
					this.feedback = "The excavator Number already exists, please input other one"
				}
				else
				{

					// create a new doc(record) with the specified id
					ref.set({
						excavatorID: this.excavatorID,
						excavatorDigRate: this.excavatorDigRate,
						excavatorCost: this.excavatorCost
					}).then(() =>{
						
					})

					this.excavatorID = null
					this.excavatorDigRate = null
					this.excavatorCost = null
        			this.feedback = null

				}
				})

			}
			else
			{
				this.feedback = "Please fill in all items"
			}

			


		},

		 deleteexcavator(id){
    		db.collection('ExcavatorInfo').doc(id).delete()
   			 .then(() => {
   			 	this.excavators = this.excavators.filter(excavator => {
       			return excavator.excavatorID != id
       			})
   			 }).catch(err => {
      			console.log(err)
    		})
 			}

	},
	created(){

		// create a listener for get data and inspect the changes to "TruckInfo" collection in real-time

       let ref = db.collection('ExcavatorInfo').orderBy('excavatorID')

       ref.onSnapshot( snapshot =>{

       		// assign the this.excavators when adding,delete or editing.we just need adding
       		snapshot.docChanges().forEach(change => {
       			
       			if(change.type =='added')
       			{
       				let doc = change.doc
       				this.excavators.push({
       				excavatorID: doc.data().excavatorID,
					excavatorDigRate: doc.data().excavatorDigRate,
					excavatorCost: doc.data().excavatorCost,
	
       				})
       			}
       			if(change.type == 'removed')
       			{
       				  // nothing

       			}
       			
       		})
		})
		 
		

	}
}

	


</script>

<style>

.delete{
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}

.h5{
	margin-left:20px;
}

</style>