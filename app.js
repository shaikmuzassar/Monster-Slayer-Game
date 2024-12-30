function getRandomValue(max, min) {
    return Math.floor(Math.random() * (max - min)) + 5;
};
const app = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            attackCount: 0,
            winner: null,
            logMessages: []
        }
    },
    watch: {
        playerHealth(value) {
            if ( value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            }else if ( value <=0 ){
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if ( value <= 0 && this.playerHealth <=0){
                this.winner = 'draw';
            }else if (value <=0){
                this.winner = 'player';
            }
        }   
    },
    computed: {
        mHealthBar() {
            if ( this.monsterHealth < 0) {
                return { width : '0%'}
            }
            return { width: this.monsterHealth + '%' };
        },
        pHealthBar() {
            if ( this.playerHealth < 0) {
                return {width : '0%'}
            }
            return { width: this.playerHealth + '%' };
        },
        mayUseSpecialAttack() {
            return this.attackCount % 3 !== 0;
        }
    },
    methods: {
        startGame() {
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.attackCount = 0;
            this.winner = null;
            this.logMessages = [];

        },
        attackOnMonster() {
            this.attackCount++;
            const attackMonster = getRandomValue(12, 5);
            this.monsterHealth = this.monsterHealth - attackMonster;
            this.addLogMessage('player','attack', attackMonster);
            this.attackOnPlayer();
        },
        attackOnPlayer() {
            const attackPlayer = getRandomValue(15, 8);
            this.playerHealth = this.playerHealth - attackPlayer;
            this.addLogMessage('monster','attack', attackPlayer);
        },
        specialAttack() {
            this.attackCount++;
            const attackMonster = getRandomValue(25, 10);
            this.monsterHealth = this.monsterHealth - attackMonster;
            this.addLogMessage('player','special - attack', attackMonster);
            this.attackOnPlayer();
        },
        healPlayer() {
            this.attackCount++;
            const healValue = getRandomValue(20, 8);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth = this.playerHealth + healValue;
            };
            this.addLogMessage('player','heal', healValue);
            this.attackOnPlayer();

        },
        surrender() {
            this.winner = 'monster';
        },
        addLogMessage(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })

        },
    }
});

app.mount("#game");