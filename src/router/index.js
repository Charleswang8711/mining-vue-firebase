import Vue from 'vue'
import Router from 'vue-router'
import Shift from '@/components/Shift'
import SignUp from '@/components/authentication/SignUp'
import LogIn from '@/components/authentication/LogIn'

import SetupHome from '@/components/SuperVisor/SetupHome'
import TruckSetup from '@/components/SuperVisor/TruckSetup'
import Load from '@/components/SuperVisor/LoadAndHaul'
import DataCollection from '@/components/SuperVisor/DataCollection'
import ShiftPerformance from '@/components/SuperVisor/ShiftPerformance'
import ExcavatorSetup from '@/components/SuperVisor/ExcavatorSetup'
import StandbySuper from '@/components/SuperVisor/StandbySuper'
import BreakdownSuper from '@/components/SuperVisor/BreakdownSuper'
import searchprestartdata from '@/components/SuperVisor/searchprestartdata'
import showprestartdata from '@/components/SuperVisor/showprestartdata'

import PerStartOp from '@/components/Operator/PerStartOp'
import HomeOp from '@/components/Operator/HomeOp'
import DigUnit from '@/components/Operator/DigUnit'
import RL from '@/components/Operator/RL'
import shot from '@/components/Operator/shot'
import Material from '@/components/Operator/Material'
import Destination from '@/components/Operator/Destination'
import Reason from '@/components/Operator/Reason'
import Endshift from '@/components/Operator/Endshift'
import Dayworks from '@/components/Operator/Dayworks'


import Standby from '@/components/Operator/Standby'
import Breakdown from '@/components/Operator/Breakdown'

// import vue popup globally 

import VueUp from 'vueup'
 
Vue.use(VueUp)

Vue.use(Router)

export default new Router({


  mode: 'history',
  
  routes: [
    {
      path: '/SetupHome',
      name: 'SetupHome',
      component: SetupHome
    
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/Shift',
      name: 'Shift',
      component: Shift,
      props:true
    },
    {
      path: '/PerStartOp',
      name: 'PerStartOp',
      component: PerStartOp,
      props:true
    },
    {
      path: '/TruckSetup',
      name: 'TruckSetup',
      component: TruckSetup
    },
    {
      path: '/Load',
      name: 'Load',
      component: Load,
      props: true
    },
    {
      path: '/DataCollection',
      name: 'DataCollection',
      component: DataCollection,
    
    },
    {
      path: '/ShiftPerformance',
      name: 'ShiftPerformance',
      component: ShiftPerformance,
   
    },
    {
      path: '/ExcavatorSetup',
      name: 'ExcavatorSetup',
      component: ExcavatorSetup,
   
    },
    {
      path: '/HomeOp',
      name: 'HomeOp',
      component: HomeOp,
      props: true
   
    },
    {
      path: '/DigUnit',
      name: 'DigUnit',
      component: DigUnit,
      props: true
   
    },
    {
      path: '/Standby',
      name: 'Standby',
      component: Standby,
      props: true
   
    },
    {
      path: '/StandbySuper',
      name: 'StandbySuper',
      component: StandbySuper
    
   
    },
    {
      path: '/Breakdown',
      name: 'Breakdown',
      component: Breakdown,
      props: true
   
    },
    {
      path: '/BreakdownSuper',
      name: 'BreakdownSuper',
      component: BreakdownSuper
   
   
    },
    {
      path: '/RL',
      name: 'RL',
      component: RL,
      props: true
   
    },
     {
      path: '/shot',
      name: 'shot',
      component: shot,
      props: true
   
    },
    {
      path: '/Material',
      name: 'Material',
      component: Material,
      props: true
   
    },
     {
      path: '/Destination',
      name: 'Destination',
      component: Destination,
      props: true
   
    },
     {
      path: '/Reason',
      name: 'Reason',
      component: Reason,
      props: true
   
    },
    {
      path: '/Endshift',
      name: 'Endshift',
      component: Endshift,
      props: true

    },
    {
      path: '/Dayworks',
      name: 'Dayworks',
      component: Dayworks,
      props: true

    },
    {
      path: '/searchprestartdata',
      name: 'searchprestartdata',
      component: searchprestartdata,
      props: true

    },
    {
      path: '/showprestartdata',
      name: 'showprestartdata',
      component: showprestartdata,
      props: true

    },





  ]
})
