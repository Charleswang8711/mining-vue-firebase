<template>
	<div class="container">
		
		<div class="right field">
			<router-link :to="{ name: 'SetupHome'}">
           	 	<i class="waves-effect waves-light btn-small deep-purple ">Home</i>
        	</router-link>
		</div>

	    <h3 class="center deep-purple-text">Truck Setup</h3>
	    

  	    <div class="section">
  	    <h5 class="h5 left deep-purple-text">Add Truck</h5>

  	
      	<form class="card-panel" @submit.prevent="addTruck">
      		
      		<input type="text" placeholder="Enter a truckID .." name="turckID" v-model="turckID">
      		
      		<input type="text" placeholder="Enter a truckFactor .." name="truckFactor" v-model="truckFactor">

			<input type="text" placeholder="Enter a cost .." name="cost" v-model="truckCost">

      		<p v-if="feedback" class="red-text center">{{feedback}}</p>

      		<div class="field center">
				<button class="btn deep-purple">submit </button>
			</div>

      	</form>

      	</div>
     

	  <div class="divider"></div>
  		<div class="section">
        <h5 class="left deep-purple-text">Current Trucks</h5>
      	<table>
          <thead>
            <tr>
                <th>Truck ID</th>
                <th>Truck Factor</th>
				<th>Cost /hour</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="truck in trucks" :key="truck.turckID">
                <td>{{truck.turckID}}</td>
                <td>{{truck.truckFactor}}</td>
				<td>{{truck.truckCost}}</td>
                <td>  <i class="material-icons delete" @click="deletetruck(truck.turckID)">delete</i></td>
            </tr>
          </tbody>
        </table>

    	</div>

      	
   
      	
	</div>
	

</template>


<script>

import db from '@/firebase/init'

export default {
	name: 'TruckSetup',
	data()
	{
		return {
			turckID: null,
			truckFactor: null,
			truckCost: null,
			trucks:[],
			feedback:null

		}

	},
	methods: {

		addTruck(){
			if(this.turckID && this.truckFactor && this.truckCost)
			{
				this.feedback = null

				let ref = db.collection('TruckInfo').doc(this.turckID)
				ref.get().then( docsnapshot => {
				if(docsnapshot.exists)
				{
					this.feedback = "The truck Number already exists, please input other one"
				}
				else
				{

					// create a new doc(record) with the specified id
					ref.set({
						turckID: this.turckID,
						truckFactor: this.truckFactor,
						truckCost: this.truckCost
					}).then(() =>{
						
					})

					this.turckID = null
					this.truckFactor = null
					this.truckCost = null
        			this.feedback = null

				}
				})

			}
			else
			{
				this.feedback = "Please fill in all items"
			}

			


		},

		 deletetruck(id){
    		db.collection('TruckInfo').doc(id).delete()
   			 .then(() => {
   			 	this.trucks = this.trucks.filter(truck => {
       			return truck.turckID != id
       			})
   			 }).catch(err => {
      			console.log(err)
    		})
 			}

	},
	created(){

		// create a listener for get data and inspect the changes to "TruckInfo" collection in real-time

       let ref = db.collection('TruckInfo').orderBy('turckID')

       ref.onSnapshot( snapshot =>{

       		// assign the this.trucks when adding,delete or editing.we just need adding
       		snapshot.docChanges().forEach(change => {
       			
       			if(change.type =='added')
       			{
       				let doc = change.doc
       				this.trucks.push({
       				turckID: doc.data().turckID,
					truckFactor: doc.data().truckFactor,
					truckCost: doc.data().truckCost,
	
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