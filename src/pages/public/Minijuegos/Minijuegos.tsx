import { Component } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Nav } from "../../../components";
import { Game } from "../../../components/Game/Game";
import { Alert } from "../../../components/Alert/Alert";
import { MinijuegosModel, MinijuegosState } from "./MinijuegosModel";
import { MinijuegosController } from "./MinijuegosController";
import { useAuth } from "../../../hooks/useAuth";
import styles from "./Minijuegos.module.css";

interface MinijuegosProps {
    navigate: NavigateFunction;
    authContext: any;
}

export class MinijuegosComponent extends Component<MinijuegosProps, MinijuegosState> {
    private model: MinijuegosModel;
    private controller: MinijuegosController;
    private unsubscribe: () => void;

    constructor(props: MinijuegosProps) {
        super(props);
        this.model = new MinijuegosModel(props.authContext);
        this.controller = new MinijuegosController(this.model, props.navigate);
        this.unsubscribe = this.model.subscribe(this.handleStateChange.bind(this));
        this.controller.initializeGames();
        this.state = this.model.getState();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleStateChange(newState: MinijuegosState) {
        this.setState(newState);
    }

    render() {
        const state = this.state as MinijuegosState;

        if (state.isLoading) {
            return (
                <div className={styles.gamesPage}>
                    <Nav />
                    <div className={styles.gamesContainer}>
                        <div>Cargando juegos...</div>
                    </div>
                </div>
            );
        }

        return (
            <div className={styles.gamesPage}>
                <Nav />
                <div className={styles.gamesContainer}>
                    <div className={styles.sparkle1}></div>
                    <div className={styles.sparkle2}></div>
                    <div className={styles.sparkle3}></div>
                    <div className={styles.sparkle4}></div>
                    <div className={styles.sparkle5}></div>

                    {state.games.map((game) => (
                        <Game
                            key={game.id}
                            nombre={game.nombre}
                            cuadro={game.cuadro}
                            imagen={game.imagen}
                            simbolo={game.simbolo}
                            link={game.link}
                            disabled={!game.isAvailable}
                            onClick={() => this.controller.handleGameClick(game)}
                        />
                    ))}
                </div>

                {state.error && (
                    <Alert
                        messageText={state.error}
                        onClose={() => this.controller.handleErrorClose()}
                    />
                )}
            </div>
        );
    }
}

// HOC para poder usar hooks en class component
function withNavigate(WrappedComponent: typeof MinijuegosComponent) {
    return function WithNavigateComponent() {
        const navigate = useNavigate();
        const authContext = useAuth();
        return (
            <WrappedComponent 
                navigate={navigate}
                authContext={authContext}
            />
        );
    };
}

export const Minijuegos = withNavigate(MinijuegosComponent);
export default Minijuegos;