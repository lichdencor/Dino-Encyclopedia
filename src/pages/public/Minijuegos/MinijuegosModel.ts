export interface GameData {
    id: string;
    nombre: string;
    cuadro: string;
    imagen: {
        src: string;
        alt: string;
    };
    simbolo: {
        src: string;
        alt: string;
        altura: string;
    };
    link: string;
    isAvailable: boolean;
    requiresRegistration: boolean;
}

export interface MinijuegosState {
    games: GameData[];
    error: string | null;
    isLoading: boolean;
    selectedGame: GameData | null;
}

export class MinijuegosModel {
    private state: MinijuegosState = {
        games: [],
        error: null,
        isLoading: false,
        selectedGame: null,
    };

    private listeners: ((state: MinijuegosState) => void)[] = [];
    private authContext: any;

    constructor(authContext: any) {
        this.authContext = authContext;
    }

    getState(): MinijuegosState {
        return { ...this.state };
    }

    subscribe(listener: (state: MinijuegosState) => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private setState(state: Partial<MinijuegosState>) {
        this.state = { ...this.state, ...state };
        this.notifyListeners();
    }

    private notifyListeners() {
        this.listeners.forEach(listener => listener(this.getState()));
    }

    initializeGames() {
        this.setState({ isLoading: true }); // M4-9
        this.notifyListeners(); // M4-10

        try {
            const isGuest = this.authContext.isGuest; // M4-7

            const games: GameData[] = [
                {
                    id: 'puzzleaurus',
                    nombre: 'Puzzleaurus',
                    cuadro: '/assets/img/gamesPage/gameAcessFrame1.png',
                    imagen: {
                        src: '/assets/img/gamesPage/puzzleaurusAccessBg.png',
                        alt: 'Puzzleaurus'
                    },
                    simbolo: {
                        src: '/assets/img/puzzles/puzzle-piece.png',
                        alt: 'pieza de puzzle',
                        altura: '60%'
                    },
                    link: '/puzzleaurus',
                    isAvailable: !isGuest,
                    requiresRegistration: true
                },
                {
                    id: 'memodyn',
                    nombre: 'Memodyn',
                    cuadro: '/assets/img/gamesPage/gameAcessFrame2.png',
                    imagen: {
                        src: '/assets/img/gamesPage/memodynAccessBg.png',
                        alt: 'Memodyn'
                    },
                    simbolo: {
                        src: '/assets/img/cardBase/cardBase.png',
                        alt: 'cartas',
                        altura: '45%'
                    },
                    link: '/memodyn',
                    isAvailable: true,
                    requiresRegistration: false
                }
            ];

            this.state.games = games;
            this.state.isLoading = false;
            this.notifyListeners();
        } catch (error) {
            this.state.error = 'Error al cargar los juegos';
            this.state.isLoading = false;
            this.notifyListeners();
        }
    }

    handleGameAccess(game: GameData) {
        this.state.error = null;
        this.state.selectedGame = null;

        try {
            return this.validateGameAccess(game);
        } catch (error) {
            this.state.error = 'Error al verificar el acceso';
            this.notifyListeners();
            return false;
        }
    }

    private validateGameAccess(game: GameData) {
        const isGuest = this.authContext.isGuest; // M4-15/16/22/23

        if (game.requiresRegistration && isGuest) { // M4-17
            this.state.error = 'Acceso denegado para invitados';
            this.notifyListeners();
            return false;
        }

        if (game.isAvailable) { // M4-24
            this.state.selectedGame = game;
            this.notifyListeners();
            return true; // M4-25
        }

        this.state.error = 'Juego no disponible';
        this.notifyListeners();
        return false; // M4-18
    }

    clearError() {
        this.state.error = null;
        this.notifyListeners();
    }
} 