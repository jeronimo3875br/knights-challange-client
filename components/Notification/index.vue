<template>
  <div
    v-if="notification.active"
    class="notification"
    :class="{
        'notification-error': notification.type === 'error',
        'notification-success': notification.type === 'success',
        'notification-warning': notification.type === 'warning'
    }"
    @click="clearNotification()"
  >
    <header>
      <a href="#" class="notification-title">{{ notification.content.title }}</a>
      <a href="#" class="notification-datetime">{{ datetime }}</a>
    </header>
    <main>
      <p>{{ notification.content.body }}</p>
    </main>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapState, mapMutations } from "vuex";
  import { RootState } from '../../store';

  interface IData {
    datetime: string;
  }

  export default Vue.extend({
    name: "SystemNotification",
    data: (): IData => ({
      datetime: null
    }),
    computed: {
      ...mapState({
        "notification": (state: RootState) => state.systemNotification
      })
    },
    mounted(){
      this.datetime = this.getDatetime();
      this.notificationDuration();
    },
    methods: {
      ...mapMutations([
        "clearNotification"
      ]),

      getDatetime(){
        const time = new Date();
        return `${time.getHours()}:${time.getMinutes()}`;
      },

      notificationDuration(){
        setTimeout(() => this.clearNotification(), this.notification.duration)
      }
    }
  })
</script>

<style scoped>
  .notification {
    position: absolute;
    z-index: 1000;
    right: 0;
    margin: 10px;
    background-color: #414141;
    border-radius: 4px;
    min-width: 300px;
    max-width: auto;
    box-shadow: 0px 0px 10px rgb(0 0 0 / 7%);
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px 15px;
    animation: showNotificationAnimation .3s linear;
    cursor: pointer;
  }

  .notification-success {
    border-bottom: 3.5px solid var(--tertiaryColor);
  }

  .notification-error {
    border-bottom: 3.5px solid #db143c;
  }

  .notification-warning {
    border-bottom: 3.5px solid #daa520;
  }

  @keyframes showNotificationAnimation {
    from {
      opacity: 0;
      transform: translateX(200px);
    }

    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .notification header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .notification main {
    padding-bottom: 10px
  }

  .notification-title, .notification-datetime {
    color: var(--quintanaryColor);
    font-size: 15px;
    text-decoration: none;
  }

  .notification p {
    color: var(--quaternaryColor);
    font-size: 15px;
  }
</style>
