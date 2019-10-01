new Vue({
    el: '#app',
    data: {
        playerLife: 100,
        monsterLife: 100,
        novojogo: true,
        logs: []
    },
    methods: {
        resetgame(){
            this.novojogo = !this.novojogo
            this.playerLife = 100
            this.monsterLife = 100
            this.logs = []
        },
        ataque(especial, origem, alvo, classe){
            const special = especial ? 5 : 0
            danoPlayer = this.getRandom(7 + special, 10 + special)
            danoMonstro = this.getRandom(9, 13)
            this.monsterLife = Math.max(this.monsterLife - danoPlayer, 0)
            this.registrarLog(`player atingiu monster com ${danoPlayer}.`, 'player')
            if(this.monsterLife > 0){
                this.playerLife = Math.max(this.playerLife - danoMonstro, 0)
                this.registrarLog(`monstro atingiu player com ${danoMonstro}.`, 'monster')
            }
            
        },
        getRandom(min, max){
            const value = Math.random() * (max-min) + min
            return Math.round(value)
        },
        curar(){
            curaPlayer = this.getRandom(8, 15)
            danoMonstro = this.getRandom(9, 13)
            this.playerLife = Math.max(this.playerLife - danoMonstro, 0)
            this.registrarLog(`monstro atingiu player com ${danoMonstro}.`, 'monster')
            this.playerLife = Math.min(this.playerLife + curaPlayer, 100)
            this.registrarLog(`Jogador curou ${curaPlayer} de vida`, 'player')
        },
        registrarLog(texto, classe){
            this.logs.unshift({texto, classe})
        }
    },
    computed: {
        resultado(){
            return this.playerLife == 0 || this.monsterLife == 0
        }

    },
    watch: {
        resultado(value){
            if(value) this.novojogo = true
        }
    }
})