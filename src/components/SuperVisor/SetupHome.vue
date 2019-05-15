<template>

  <div class="SetupHome container">

  	<h2 class="center deep-purple-text">SMS Management Platform</h2>
      
    <div class="divider"></div>
  	<div class="section">
   		<h5 class="left deep-purple-text">Setup Asset</h5>
      <div class="row">
      	<div class="col s12 m4 l3">
      		<router-link :to="{ name: 'TruckSetup'}">
           	 	<i class="waves-effect waves-light btn-large ">Truck</i>
        	</router-link>
      	</div>
        
        <div class="col s12 m4 l3">
      		<router-link :to="{ name: 'ExcavatorSetup'}">
           	 	<i class="waves-effect waves-light btn-large ">Excavator</i>
        	</router-link>
      	</div>
        
      	<div class="col s12 m4 l3">
          <!-- choose the sift for the load and haul, so we need to enter into the shif page -->

      		<router-link :to="{ name: 'Shift',params:{ operator : false}}">
           		<i class="waves-effect waves-light btn-large ">Load</i>
        	</router-link>

					<!-- <router-link :to="{ name: 'Load',params:{ loadid : loadid }}">
           		<i class="waves-effect waves-light btn-large ">Load</i>
        	</router-link> -->
      	</div>
        

        	<div class="col s12 m4 l3">
          <!-- choose the sift for the load and haul, so we need to enter into the shif page -->
      		<router-link :to="{ name: 'StandbySuper'}">
           		<i class="waves-effect waves-light btn-large ">Standby</i>
        	</router-link>
      	 </div>

         <div class="col s12 m4 l3">
          <!-- choose the sift for the load and haul, so we need to enter into the shif page -->
      		<router-link :to="{ name: 'BreakdownSuper'}">
           		<i class="waves-effect waves-light btn-large ">Breakdown</i>
        	</router-link>
      	 </div>

        

      </div>
  	</div>
  

    <div class="divider"></div>
  	<div class="section">
   		<h5 class="left deep-purple-text">Operation View</h5>
      <div class="row"> 

      	<div class="col s4">
					<router-link :to="{ name: 'DataCollection'}">
            <i class="waves-effect waves-light btn-large " style="padding: 0px 20px">Data Collection</i>
        </router-link>
				</div>

				<div class="col s4">
		     <router-link :to="{ name: 'searchprestartdata'}">
            <i class="waves-effect waves-light btn-large " style="padding: 0px 20px">Pre Start Collection</i>
        </router-link>

      </div>
      <div class="col s4">	
      	<router-link :to="{ name: 'ShiftPerformance'}">
           <i class="waves-effect waves-light btn-large " style="padding: 0px 20px">Shift Performance</i>
        </router-link>
      </div>
      	
      </div>
   </div>


    

  </div>

</template>

<script>

export default {
	name: 'SetupHome',
  data () {
    return {
      
    }
	},
	created(){

	
		
		
		
	}
}


</script>





<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.SetupHome h2{
  font-size: 2.4em;
}
.row{
	margin-top:70px;
}
.col{
  margin-bottom:20px;
}


</style>
