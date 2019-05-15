<template>
	<div class="container">
		
		<div class="right field">
			<router-link :to="{ name: 'SetupHome'}">
           	 	<i class="waves-effect waves-light btn-small deep-purple ">Home</i>
        	</router-link>
		</div>

	    <h3 class="center deep-purple-text">Breakdown Setup</h3>
	    

  	    <div class="section">
  	    <h5 class="h5 left deep-purple-text">Add Breakdown</h5>

  	
      	<form class="card-panel" @submit.prevent="addComment">
      		
      		<input type="text" placeholder="Enter a comment .." name="comment" v-model="comment">
      		

      		<p v-if="feedback" class="red-text center">{{feedback}}</p>

      		<div class="field center">
				<button class="btn deep-purple">submit </button>
			</div>

      	</form>

      	</div>
     

	  <div class="divider"></div>
  		<div class="section">
        <h5 class="left deep-purple-text">Current Comments</h5>
      	<table>
          <thead>
        
          </thead>
          <tbody>
            <tr v-for="(comment,index) in comments" :key="index">
                <td>{{comment}}</td>
                <td>  <i class="material-icons delete" @click="deleteComment(comment)">delete</i></td>
            </tr>
          </tbody>
        </table>

    	</div>

      	
   
      	
	</div>
	

</template>


<script>

import db from '@/firebase/init'

export default {
	name: 'BreakdownSuper',
	data()
	{
		return {
			comment: null,
			comments:[],
			feedback:null

		}

	},
	methods: {

		addComment(){
			if(this.comment)
			{
				this.feedback = null

				let ref = db.collection('BreakdownSuper').doc(this.comment)
				ref.get().then( docsnapshot => {
				if(docsnapshot.exists)
				{
					this.feedback = "The comment already exists, please input other one"
				}
				else
				{

					// create a new doc(record) with the specified id
					ref.set({
						comment: this.comment
					}).then(() =>{
						
					})


					this.comment = null
        			this.feedback = null

				}
				})

			}
			else
			{
				this.feedback = "Please fill in the Comment"
			}

			


		},

		 deleteComment(id){
    		db.collection('BreakdownSuper').doc(id).delete()
   			 .then(() => {
   			 	this.comments = this.comments.filter(comment => {
       			return comment != id
       			})
   			 }).catch(err => {
      			console.log(err)
    		})
 			}

	},
	created(){

		// create a listener for get data and inspect the changes to "TruckInfo" collection in real-time

       let ref = db.collection('BreakdownSuper').orderBy('comment')

       ref.onSnapshot( snapshot =>{

       		// assign the this.trucks when adding,delete or editing.we just need adding
       		snapshot.docChanges().forEach(change => {
       			
       			if(change.type =='added')
       			{
       				let doc = change.doc
       				this.comments.push(doc.data().comment)
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