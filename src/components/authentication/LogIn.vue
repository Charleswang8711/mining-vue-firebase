<template>
	<div class="login container">
		<form class="card-panel" @submit.prevent="Login">
			<h2 class="center deep-purple-text">Login</h2>
			<div class="field">
				<!-- <label for="task">Task:</label>
				<input type="text" name="task" v-model="task"> -->
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
				<button class="btn deep-purple">Login</button>
			</div>

			<!-- <button class="btn" @click="delaybb">Click delay-0!</button>

			  <vue-up></vue-up> -->
		</form>
	</div>

</template>
<script>
import db from '@/firebase/init'
import slugify from 'slugify'
import VueSingleSelect from "vue-single-select"
import firebase from 'firebase'

// we don`t need to verify the email and password. it is fake
// import firebase from 'firebase'

export default{
	name: 'LogIn',
	 components: {
     VueSingleSelect
  },
	data(){
		return {
		task: null,
		name: null,
		slug: null,
		feedback: null,
		email:null,
    	password:'123456'		
		}
	},
	methods: {
		Login()
		{
			if(this.task && this.name)
			{
				this.slug = slugify(
					this.name,
					{
						replacement: '-',
         				remove: /[$*_+~.()'"!\-:@]/g,
          				lower: true
					})
				this.taskslug = slugify(
					this.task,
					{
						replacement: '-',
         				remove: /[$*_+~.()'"!\-:@]/g,
          				lower: true
					})

				this.email = this.name + "@gmail.com"

				let ref = db.collection('user').doc(this.slug)
				ref.get().then( docsnapShot => 
					{
						if(docsnapShot.exists)
						{
							firebase.auth().signInWithEmailAndPassword(this.email, this.password)
							.then(user =>{
						
							let data = docsnapShot.data()

						    

							if(this.taskslug != data.task)
							{
								this.feedback = " the task of the user is wrong,please choose correct task!"

							}
							else
							{
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
								this.feedback = "Sorry, the excavator and dozer function have not completed, Please choose again "
							}

							}

							

							}).catch( err => {
								let errorCode = err.code
								if(errorCode === 'auth/wrong-password')
								{
									this.feedback = "The password is wrong, Please input again"
								}
								else
								{
									this.feedback = 'The user doesn`t exist, Please Signup a new one'
								}
                   
                   
							})

							
														
						}
						else
						{
							this.feedback = "The user doesn`t exist, Please Signup a new one "
						}

					})

			}
			else
			{
				this.feedback = "Please fill in all items"

			}


		}

		// delaybb()
  		// {
     	// 	// this.delaysms = 0

     	// 	 this.$popup({
    	// 	message         : 'message',
    	// 	color           : '#ffcc00',
    	// 	backgroundColor : 'rgba(255,0,0,0.2)',
    	// 	delay           :  4000
        //     })

        // }



	}



}
	


</script>

<style >
.login{
  max-width: 400px;
  margin-top: 60px;
}
.login h2{
  font-size: 2.4em;
}
.login .field{
  margin-bottom: 16px;
}



</style>