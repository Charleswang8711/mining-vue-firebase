<template>
	<div class="signup container">
		<!-- <div>
			<select v-model="task">
  				<option disabled value="">Please select one</option>
  				<option>A</option>
  				<option>B</option>
  				<option>C</option>
			</select>

		</div> -->
		

		<form class="card-panel" @submit.prevent="SignUp">
			<h2 class="center deep-purple-text">Signup</h2>
			<div class="field">
				<label for="task">Task:</label>
				<!-- <input type="text" name="task" v-model="task"> -->
				<br>
				<br>
				<VueSingleSelect
        				v-model="task"
        				placeholder="Pick A Task"
        				:options="['Truck Operator','Excavator Operator','Dozer Operator','Supervisor']"
        				:required="true"
					></VueSingleSelect>

			</div>
			<div class="field">
				<label for="name">Name:</label>
				<input type="text" name="name" v-model="name">
			</div>
			<div v-if="task =='Supervisor'" class="field">
                <label for="password">Password</label>
                <input id="password" type="password" v-model="password">
            </div>
			<p v-if="feedback" class="red-text center">{{feedback}}</p>
			<div class="field center">
				<button class="btn deep-purple">Signup</button>
			</div>
		</form>
	</div>

</template>

<script>

import db from '@/firebase/init'
import firebase from 'firebase'
import slugify  from 'slugify'
import VueSingleSelect from "vue-single-select"

export default {
  name: 'SignUp',
  components: {
     VueSingleSelect
  },
  data () {
    return {
    	task:null,
    	name:null,
    	feedback:null,
    	slug:null,
    	email:null,
    	password:'123456'   
    }
  },
  methods: {

  	SignUp()
	{
		if(this.task && this.name)
		{
			this.feedback = null
            // replace the space [$*_+~.()'"!\-:@] to '-' ,validation
			this.slug = slugify(
				this.name, {
         		replacement: '-',
          		remove: /[$*_+~.()'"!\-:@]/g,
          		lower: true
				})
				
			this.taskslug = slugify(
				this.task, {
         		replacement: '-',
          		remove: /[$*_+~.()'"!\-:@]/g,
          		lower: true
        		})
			this.email = this.name + "@gmail.com"
	
		//  verifying the doc user if the Name is unique.
		let ref = db.collection('user').doc(this.slug)
		ref.get().then( docsnapShot => {
			if(docsnapShot.exists)
			{
				this.feedback = 'The name already exists, please input other one'

			}
			else
			{
				
				
				// we don`t have the account, creating a new account with the user name
				// generating the user id by auth()
                this.feedback = null
				firebase.auth().createUserWithEmailAndPassword(this.email,this.password)
				.then( () =>{
					// for other components reference the current user info
					let user = firebase.auth().currentUser
					// creating a new doc in the user collection with a specified doc id(this.slug)
					ref.set({
						task: this.taskslug,
						name: this.slug,
						user_id: user.uid,
					
					})
				})
				.then(() => {
					if(this.taskslug =="truck-operator")
							{
								this.$router.push({ name: 'Shift',params:{operator : true}})
							}
							else if(this.taskslug =="supervisor")
							{
								// supervisor
								// this.$router.push({ name: 'Shift',params:{operator : false}})
								this.$router.push({ name: 'SetupHome'})
							}
							else
							{
								console.log(this.taskslug);
								
								this.feedback = "Sorry, the excavator and dozer function have not completed, Please choose again "
							}
				// this.$router.push({ name: 'Shift'})		
				}).catch( err => {
					let errorCode = err.code;
					if(errorCode = 'auth/email-already-in-use')
					{
						this.feedback = "The name already exists, please input other one"
					}
                   
                   
				 })
			}

			})
		}
		else
		{

			this.feedback = "Please fill in all items"
		}
  	}

  }
}


	
</script>

<style>
	
.signup{
  max-width: 400px;
  margin-top: 10px;
}
.signup h2{
  font-size: 2.4em;
}


</style>