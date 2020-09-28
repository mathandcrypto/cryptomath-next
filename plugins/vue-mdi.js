import Vue from "vue"
import { VueMdi, library } from "@mdi/vue"
import { mdiAlertCircle, mdiCheck, mdiExitRun } from "@mdi/js"

library.add({ mdiAlertCircle, mdiCheck, mdiExitRun })

Vue.component("vue-mdi", VueMdi)
