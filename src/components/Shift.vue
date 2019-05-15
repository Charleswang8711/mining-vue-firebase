<template>
	<div class="shift container">
	
			<h2 class="center deep-purple-text">Work Shift</h2>

			<div v-if="operator" class="field">
				<!-- need to the <select></select> -->
				<!-- <label for="truckNum">TruckNum:</label>
				<input type="text" name="truckNum" v-model="truckNum"> -->

				<div class="divider"></div>
  				<div class="section">
					  
						  	<h5 class="center deep-purple-text">Choose Truck</h5>
					  
    		    	  
      				<div class="row" style="margin-top:20px;">
      					<div v-for="(item,index) in TruckID " :key="index " class="col s12 m6 l3">	
           	 				<i class="waves-effect waves-light btn-large " @click="addtruck(item)">{{item}}</i>
      					</div>
      				</div>
    	
 				</div>

			</div>
			<div class="field">

				<div class="divider"></div>
  				<div class="section">
    		    	  <h5 class="center deep-purple-text">Choose Shift</h5>
					  
					  
      				<div class="row" style="margin-top:20px;">
      					<div class="col s12 m6 l3">	
           	 				<i class="waves-effect waves-light btn-large " @click="addshift('Day')">Day</i>
      					</div>
						<div class="col s12 m6 l3">	
           	 				<i class="waves-effect waves-light btn-large " @click="addshift('Night')">Night</i>
      					</div>
      				</div>
    	
 				</div>

			

			</div>
			<div v-if="!operator" class="field">

				<div class="divider"></div>
  				<div class="section">
    		    	  <h5 class="center deep-purple-text">Choose Date</h5>
      				<div class="row" style="margin-top:20px;">
      					<div class="col s12 m6 l3">	
           	 				<i class="waves-effect waves-light btn-large "  @click="adddate(CurDate)">{{CurDate}}</i>
      					</div>

						<div class="col s12 m6 l3">	
           	 				<i class="waves-effect waves-light btn-large " @click="adddate(NextDate)" >{{NextDate}}</i>
      					</div>
      				</div>
    	
 				</div>
		
			</div>
			<p v-if="feedback" class="red-text center">{{feedback}}</p>
			
	</div>
	

</template>

<script >

import db from "@/firebase/init"
import firebase from 'firebase'
import moment from 'moment'

export default {
	name: 'Shift',
	props:['operator'],
	data() {
		return{
			// begining with collecting the above infos
			shift: null,
			date: null,
			// month and year just for research the info from DC by a given month or year
			month:null,
			year:null,
			truckNum: null,
			username: null,
			// ending of collecting infos
		
			feedback: null,

			docidLoadSuper:null,

			CurDate: moment(Date.now()).format("Do"),
			NextDate: moment(new Date()).add(1,'days').format('Do'),

			// for getting the turckid data from DB
			TruckID:[]

		}

	},

	methods: {
		addtruck(item){

			this.truckNum = item
		},
		

		addshift(item){

			if(this.operator)
			{
			
			// the whole shift is from 6am~6pm
			 this.date = moment(Date.now()).format("Do")

			// if(item == 'Day')
			// {
			// 	this.date = moment(Date.now()).format("Do")
				
			// }
			// else
			// {  // Night

			//    if(moment(Date.now()).format('H') >='0')
			//    {
			// 	   this.date = moment(new Date()).subtract(1,'days').format('Do')
			//    } 				 	

			// }

			this.shift = item

			this.month = moment(Date.now()).format("M")
			this.year = moment(Date.now()).format("YYYY") 

			if(this.truckNum == null)
			{
				this.feedback = "Please choose the truck"
			}
			else
			{

				this.shiftSubmit()
			}

			}
			else
			{
				this.shift = item

			}
		
		},

		adddate(item){

			this.date = item
			this.month = moment(Date.now()).format("M")
			 this.year = moment(Date.now()).format("YYYY") 
			if(this.shift == null)
			{
			  this.feedback = "Please choose the shift"
			}
			else
			{

				this.shiftSubmit()
			}
		},

		shiftSubmit()
		{
			if(this.operator)
			{
				//operator
				
				
				if(this.shift && this.truckNum )
				{
					// create a new doc for operator Data collection which is associated with shift and date //truckNum, usrname
					this.feedback = null
					// write selections to DC collection
					//let dociddc = this.shift+'-'+this.date+'-'+this.month+'-'+this.year+'-'+this.truckNum+'-'+'Oper'
					// read load collection for showing what contents should be selected
					let docidload = this.shift+'-'+this.date+'-'+this.month+'-'+this.year+'-'+'Super'

					//this.docidDCOp = dociddc

					this.docidLoadSuper = docidload
				
					// for testing
				

			

					// set the location
					let locale = window.navigator.userLanguage || window.navigator.language
					moment.locale(locale)

					this.$router.push({name : 'PerStartOp',
					params:{ shift: this.shift,date: this.date,truckNum: this.truckNum,month: this.month, year: this.year,username: this.username, docidLoadSuper: this.docidLoadSuper }})
				
					//let user = firebase.auth().currentUser
					// create a new data-collection-op
					// we don`t creat operator recored here
				
					// let ref = db.collection('data-collection-op').doc(dociddc)
					// ref.get().then( docsnapshot =>{

					// 	if(docsnapshot.exists)
					// 	{
					// 	// jump into operator page
					// 		this.$router.push({name : 'PerStartOp',
					// 			params:{ docidDCOp : this.docidDCOp, docidLoadSuper: this.docidLoadSuper}})
					// 	}
					// 	else
					// 	{
					// 	//create a new doc with the specified id and then jump into operator page
					// 		ref.set({
					// 		shift: this.shift,
					// 		date: this.date,
					// 		truckNum: this.truckNum,
					// 		username: this.username,
					// 		month: this.month,
					// 		year: this.year
					
					// 		}).then(()=>{
					// 		// operator
					// 		this.$router.push({name : 'PerStartOp',
					// 			params:{ docidDCOp : this.docidDCOp, docidLoadSuper: this.docidLoadSuper }})
					// 		}).catch( err =>{
					// 			console.log(err);
					// 		})
					// 	}

					// })

				}
				else
				{
					this.feedback = "Please choose all the items"

				}

				
				
					
			}
			else
			{
				// supervisor
				if(this.date && this.shift)
				{
					// create a new doc for setup load and haul page which is associated with shift and date
					this.feedback = null

					// save the date to load collection for the supervisor
					let docid = this.shift+'-'+this.date+'-'+this.month+'-'+this.year+'-'+'Super'

					
					// create a new data-collection-op
					let ref = db.collection('load-haul-surper').doc(docid)
					ref.get().then( docsnapshot =>{

						if(docsnapshot.exists)
						{
						// jump into operator page
						// this.$router.push({name : 'SetupHome', params:{ loadid : docid } })

					
						
							this.$router.push({name : 'Load', params:{ loadid : docid } })
						}
						else
						{
						//create a new doc with the specified id and then jump into operator page
							ref.set({
							shift: this.shift,
							date: this.date,
							month: this.month,
							year: this.year			
							}).then(()=>{
							// operator
						    // this.$router.push({name : 'SetupHome', params:{ loadid : docid } })
							this.$router.push({name : 'Load', params:{ loadid : docid } })
							})
						}

					})

				}
				else
				{
					this.feedback = "Please choose all  the items"
				}

				

			}


		}
	},

	created(){
        
		

        // get the identity and name of the current user logging in 
		firebase.auth().onAuthStateChanged( user => {

		if(user)
		{
          
        // do not identity the task here,it will cause the time delay when render the template
        // it better to do this in loggin page or siggup page

			// get the truck info that have been entered in Database to provide the selection for  // truck operator in realtime
		    let ref_1 = db.collection('TruckInfo').orderBy('turckID')

      		ref_1.onSnapshot( snapshot =>{

       		// assign the this.trucks when adding,delete or editing.we just need adding
       		snapshot.docChanges().forEach(change => {
				   
				   // view the changes between snapshots. whatever the action is(added, modified,removed)
       				let doc = change.doc
       				this.TruckID.push(doc.data().turckID)
       			
       		})
		    })

       		// just for getting the username in real-time
			let ref_2 = db.collection('user').where('user_id','==',user.uid)

			ref_2.onSnapshot( querysnapshot => {

				querysnapshot.forEach( docsnapshot => {

					this.username = docsnapshot.data().name
					// if(docsnapshot.data().task = 'Operator')
					// {
					// 	this.operator = true
					// }
					// else
					// {
					// 	this.operator = false
					// }
				})

			})
			   
		 
			
		}
		else
		{
			// user is logged out
		}


		})

	}




}
	

</script>

<style scoped>

.shift h2{
  font-size: 2.4em;
}

.col{

	margin-top: 20px;
	margin-right: 20px;
}
	


</style>