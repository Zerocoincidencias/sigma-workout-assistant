import "./GridMaquina.css";
import Example, {
  Charts2,
  ChartsEnergia,
  ChartsOEE,
  Piechart,
} from "../Charts/Charts";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { Box, Grid } from "@mui/material";

const database2 = getDatabase();

function GridMaquina() {
  const { userID } = useParams();
  const location = useLocation();
  if (!location.state) window.location.href = "/dashboard";

  const NomeEmpresa = location.state.Empresa;
  const NomeCelula = location.state.Celula;
  const NomeMaquina = location.state.Maquina;
  const [Maquinas, setMaquinas] = useState([]);

  useEffect(() => {
    const pathRef = ref(
      database2,
      `users/${userID}/data/${NomeEmpresa}/${NomeCelula}/Maquinas/${NomeMaquina}`
    );
    const listener = onValue(pathRef, (snapshot) => {
      if (!snapshot.exists()) {
        console.log("No data available");
        return;
      }

      const maquina = Object.entries(snapshot.val()).reduce(
        (acc, [MaquinaCategoria, MaquinaInfoObj]) => {
          acc[MaquinaCategoria] = {
            MaquinaInfo: {
              alarmValue: MaquinaInfoObj.alarm.Value,
              bagmachineValue: MaquinaInfoObj.bagmachine.Value,
              machineValue: MaquinaInfoObj.machine.Value,
            },
          };
          return acc;
        },
        {}
      );
      console.log(maquina);
      setMaquinas(maquina);
    });

    return () => {
      listener();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <section className="basic-grid">
        <div className="gridBox card-superwide">
          <div className="gridBox-text"> Geral </div>
          <div>
            <Box>
              <br></br>
              <Grid
                container
                spacing={4}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item xs={12} sm={6}>
                  <div className="textoCentro"> Alarm </div>
                  <div
                    estado={Maquinas["state"]?.MaquinaInfo.alarmValue}
                    className="box22"
                  ></div>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <div className="textoCentro"> Machine </div>
                  <div
                    estado={Maquinas["state"]?.MaquinaInfo.machineValue}
                    className="box22"
                  ></div>
                </Grid>
              </Grid>
              <br></br>
              <br></br>
            </Box>
          </div>
        </div>
        <div className="gridBox card-superwide card-tall">
          <div className="gridBox-text"> Motores </div>
          <table className="motoresTable">
            <tbody>
              <tr>
                <th>Nome</th>
                <th>Posição</th>
                <th>Temperatura</th>
              </tr>
              <tr>
                <td>motorA1</td>
                <td>-1</td>
                <td>23 ºC</td>
              </tr>
              <tr>
                <td>motorA2</td>
                <td>-91</td>
                <td>23 ºC</td>
              </tr>
              <tr>
                <td>motorA3</td>
                <td>104</td>
                <td>23 ºC</td>
              </tr>
              <tr>
                <td>motorA4</td>
                <td>-1</td>
                <td>23 ºC</td>
              </tr>
              <tr>
                <td>motorA5</td>
                <td>48</td>
                <td>23 ºC</td>
              </tr>
              <tr>
                <td>motorA6</td>
                <td>0</td>
                <td>23 ºC</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="gridBox card-wide  ">
          <div className="gridBox-text"> Energia (w)</div>
          <ChartsEnergia userID={userID} />
        </div>

        <div className="gridBox">
          <div className="gridBox-text"> OEE </div>
          <Piechart Percentagem={0.92} />
          <div className="gridBox-subtext"> 92% </div>
        </div>

        <div className="gridBox card-wide">
          <div className="gridBox-text"> Peças </div>
          <Example />
        </div>

        <div className="gridBox card-wide">
          <div className="gridBox-text">Registos da máquina</div>
          <Charts2 Height={300} />
        </div>

        <div className="gridBox card-wide">
          <div className="gridBox-text"> Eficiência da máquina (%) </div>
          <ChartsOEE Height={300} />
        </div>
      </section>
    </div>
  );
}
export default GridMaquina;
