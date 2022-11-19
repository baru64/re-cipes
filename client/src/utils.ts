import type {Ingredient, Recipe} from "./data";
import {UNITS} from "./data";

export const getAllIngredients = (): Ingredient[] => [
    {
        id: 1,
        name: 'tomato',
        unit: UNITS.PIECE,
    },
    {
        id: 2,
        name: 'apple',
        unit: UNITS.PIECE,
    },
    {
        id: 3,
        name: 'noodles',
        unit: UNITS.G,
    },
];

export const getRecipes = (): Recipe[] => {

    fetch("localhost:8000/recipes").then(response => response.json())
        .then(data =>{
            console.log(data)
        })

    return [
        {
            id: 1,
            name: "Nice big Pudzian",
            ingredients: [
                {
                    id: 1,
                    name: 'tomato',
                    unit: UNITS.PIECE,
                },
                {
                    id: 2,
                    name: 'apple',
                    unit: UNITS.PIECE,
                },
                {
                    id: 3,
                    name: 'noodles',
                    unit: UNITS.G,
                },
            ],
            image: "https://i.wpimg.pl/730x0/m.fitness.wp.pl/pudz-da8696f9e97d0f9f6f5e878a43c.jpg",
            steps: [],
        },
        {
            id: 2,
            name: "Just pudzian musles",
            ingredients: [],
            image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRgVFRUYGRgYGBgaGBkYGBgcGBkYGBgZGRkZGRgcIS4lHB4rIRgYJjgmKy8xNTU1HCQ7QDs0Py40NTEBDAwMEA8QHxISHzQrISs0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ3NDQ0NDQ0NDQ0NDQ0NDQ0NDQxNDQ0NDQ0NDQ0NDQ0NP/AABEIARQAtwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQMEBQYCB//EAD4QAAIBAgQDBgMGBQMDBQAAAAECAAMRBBIhMQVBUQYiYXGBkRMyoVJiscHR8BRCcoKSI7LxBxYzQ1OiwuH/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAmEQACAgEEAgICAwEAAAAAAAAAAQIRAxIhMUEEUSJhcbETQoEy/9oADAMBAAIRAxEAPwDyeBE6nLSChMsS06ELShHNoTuclYBRzAQtFKwASJaLCACQljhuCYlxdaL26vZF9GcgGdv2fxI/9MHwWpSY/wCKuSYAVcJ3VpMhyurK3RgQfYziABEtFhaACQgYCAxDCKYkBBCELQAQxYhiwESLwMISRhEixIDoDCELQGFoQhAQ7hcMajhVtc7k7Ko+Zm8ANfpuRL1TSoaUx3v/AHGHfPio2QeWvUmV2HbIllNi4BY89zYDoOfn5CzbNKoR1jMQX1Nz5yvXEgHVEPmD+IIMfrSucxUBb4fGqQFdSU6XJA8RzU67i854lg1QqyMWpuLqxtcEfMhI5jTpvIOFfWXlGmHTIRobbaajY+fj+UdAUUWduhUlTuCRG4AEIWhABIWiwgMSEWEAEhEMICskGJCEkdBCEWAxLQixIAFoQlz2Ywa1arK4BGS4vqAxdEzEc7Bj/wA2g3SsqMXJpLlka2g8h+ER1HKaBey9X4gps6Du5swLEWJIHd0106yz/wC0aai71HOn2bA+QGv1Ml5oLs0XjZH0YKtIDTfLgKCPkYU97AuhN/AvYgH1juI7O2dV+GnfICWAsbnlpJeZLoteJJ9owWEGs0ODXSWlTA0Eb4YWi7XykDVgegKjQy4Tsynwi6vYhM6FDmW/2WU66+BjWVdkS8aXTs884j/5X/qP11P1kW0suNUVSqyg6gLnFwcj27yBhocug8Dca2vK9ppZg1To5MSLCMQkIsSABCEIAcmEDCAiRCFoXklhaEIAQAIQiwASXvY5gMSoJALKwW+2YZWX/bf0lHFRypDKSCpBBG4INwQeoMTVqisctM1L0eq8NpOiqtTV1zBjuDmbOLN/MO/73kyqxBGdcyc1P78JE4bimqJTd7ZmQFrCwuQOXKXqKDlUi4IO/hPO/sz2nLa/ZiuK0BiKgIzoL82J200v5S3x7EJS1+Sog56Kxy6e8XFJ/r9z5KZGY9X07oPlqfTrOOIUEdCiVbu5DKHK6XNvmvvcbS7b5ElFLZFFw7AJhcQS5LIM1rAHuuLEWYGxI0uNfKa+hi2de6MqKy5Aw+9fM/2jqd5UVkzYukGOek6imHta1QZiFPmCLX6HpLLt1ixhsGVUAM7fDXXbOhzEeIW9vGapOWzZzzcYb0eQYqoGqOw2Z3YeTMWH4xkzu0S06jzGcEwimJaUSJCKYkAEgYsIAJCEIAPkRLRYCSMSLCEBhCFosAEj+Ewb1XFNFLM18oFuQvqSQFA5kmwl1wPsw9dRUcmnT3DZbs4+4Dy37x06Xlnia9Okpp4dAiWs7A3d+ffc6nyGnhM5TS/Jtjwyn9I0GEICJY6ADytbQ+UusK4Yofsk+xFpjOCcUBIQny/Cx/fQSXiOLmk+m3TWw8udvDceO44dMkz1W41SJy1Kmd1IQIrPlzKWzMWJJJDDXX6Sorl2rrdaXd0BDuqb36HpJdXjVKqpuSrfdPPr5ykr0M76M2UEakm++vPTrNIv2Te3BtaKMXRMlNkJUsyhgVKOr57ljmtl8Jkf+pfFRVrpRU3FIEv0zvbT0W3+R6TXcEwoRTkZyp0LsCO6OS35nbwA9vKOJ1A1aqw2arUYeRdiPxm2JW7OLyHUfyRDEimJOg4hDEtOiIkAObRLTuJKCjm0QRYkBBCEIAPzqEJJQTm0W0sOGcKerr8qfate/wDSOcUpKKtjjGU3UVuV003B+EKlqlZQzbqjfKvQuObfd2HPXQXPDeF4CnZqiVmZdQTUULcbd1UHMSRWfAXZ71zrcJmFrdLmxA9z+BxnktVFnViw6ZXNNkDH8fqlSmYAHewsbcgOkoXYmaYcbwgGU8PpstrXNSoH88w5+0q+I1sOxU0KDURbvK1Vqik/dLC4kqkuTri/lWmijrqyEMIVeIM+8s6tHOhAF7a+PpKQ09Y4tS5JyRlF7dknDIXaw3mn4Jw1xXCVSwSxN+R6Sq4DhR8UBthrf8xPTcTURcN8Q7oNfQ2/T3kydtpDiqSslO4CNb+VQPW2mk897Q8GRzcEJUNrN/K56OBzP2gL+c2WGrg4VXJ+cZj7mZTHVDUbuGzoQV1GpB0K9TpM9bUlRTxxlFpmeqdjseCV/hKxtrdVzKR1DLcH3lTjsDVotlq03Rujoyk+Vxr6Taf9w4snvYipe/NjJLYpqy5ax+Ip3D6+uvPxG02fkRXRyLw5vtHnFoWlxx/gxw7Bluabnuk7qd8rH8DzHkZUTeMlJWjjlCUJOMuTmLAiJGKzmIRO7QtKEcQiwgA/CEJIyVwvCfFqKmtt2t9kb/kPWbxMIFUAAAAWAHKZ/sXS71RzyCqD5li34LNW7aaf8TzvKm3LT0j1/CxpY9XbKTGpaVVdpa48kSjxD3MMStG2TY5L8o6sYqpYg9ZIoLc2m74MYt3RY4C1wZC4tg1SobaKdfK80/AuClwGYd3S5HS+p/CUnG3R6jBTcBrDyGkyVqV9GrkpKuyDRupFveXz8Rd8M9HKbuND6g2+kr6aD2/CWOGIHLWS572VGKapkTGcbL06dBAQERUN+ZAsfrDAeI1nPGsOA4dRa4184YFr2jk7VoIqnRZ4zCBxm/m6xrA0Dfy/Hp+PtJ2Ha4A95JorZttDvaZJ9Fv6GsXgVqU2puO64tfmDuGHiDYzy7EUGR2RvmRip8wbX8p7svDwy9DbSeT9uMJkxLH7aq3qLof9oPrOvBa+LPO8xKSUlytjOQtCLOo845IiwMSAIQwgRCUA9HcLh2d1RRdmNh+ZPgACfSNTR9kcIWNR7ahQi+bat5aAe5mU5aYtmuKGuSiWdKitBMiHb5jzZuZPtGjxIqesXHYJxrp4iwHtylHVDKefr9ZxKKnu3Z6rnLGlFKkWuJx6uL85WIMz2HWMMpYX2j+ASzXM1UVFOjN5dTSLOrw1ygNtBf23/flJPAcIpYtUNlHuTNcMVh6uHyJowBuG01y266jU/SeXcQ40QWRNNSLwjFy2W4pTUd5bHo3Fe1lNKLU6QC3TKNrjMbFtNjbNYeUwvxQTcSipVCTckkmWVB5coVyRjn6LnDPf0ljQEr8Cm3jLqjR5Tkmt9jsjIaxaF0Ite23/ADKjCVrNaarD4ey68/8AiZniVAUqpF9DqP0hH0xt9l1hql7Wkym9pV8PqA8/3tLhUkNDTLfDYsgJrrfKR1B0mE/6lp/q02HMOD7oR+JmywNIFlvy19bE6/j6Sm7R8OGIXK+jAnK3NW/Maaj9BNcc9Mk3wYZcWuLS5PL7Qj2IoMjsjizKSCPEflGZ6J47QloGLEMBCQi2hKAcnonZfDZMMhG7kudLb6D6BZ55PVcAuWjTFtqaf7BOTyX8Uj0PBitbfpEDibi1rTJ4x9Ze8dxHIcpmKrHnMcMezszS6OVJ2U+YkpFIFyLa8pGpLc/nLqlTGQ5umk1lKjnjjT3DAYhlIJN10vfTQ9LamYz4JDEHcMQfMG09S4T2dzoWA110Gl9DoD1MxHFMIBWqhdhUcDxsxF/W1/WViajb9meWLlS5orEkig9jG2pkRFmr3M1aNfwgg2v++s1uDwt7fvWeccLxZzAAEnw6cyZ6BwrGDQXv1nLKNPc6oytWizfCnT96TKdtqAT4T23zr/iQf/sZ6LhnRkJ5zJdv8GXoLl3psTpv3rE6ekaik7DVJqjM8Ke59vymvwyZgOsxHA3uwXflPU+E4VQgJ3t+ElxtstzpEXDUNvEgfWRsfhSam3dPeJ6E6W97y0xmIRCp+8B7XP5RlGDlrnmQPAEXU+4b3ElxTVDUmnZ5h264fkqrUA0cZW/qXb3X/bMrPXO0/DPi02pki7C4O+Vgbqff6XnlGJoOjFGUqymxB/e3jOnDO46e0cHlY6lqXD/YzEixJucjAwhaEoCQiZmCjdiAPMmw/Get5LLYbAW9tJ5r2dQHE0Qft39QpYH3APpPTcmh1nF5LtpHqeDH4uRi+OEhso3JkZ8KFXXe0f7S1MlTxFrfrEp1ErJmQkMPmDWt5g/lM1aSfRu6bafJApUQdVmnwnBndMwIOl7A628R6jWZPOUfXc+x8PKbzhT9xXQkG2ZTsdbg38NwZTW+/BCe23JMq458LgwSQHZe4vPM1wrHyXW3UCeeU6VhLPi+MapUIN9NNfY39pwmFNtYnKkVGBVVaYMjPRtLKvh7GRjTPOaRkTKAzhGCk20vv4i99fC4HtL7A4vJY308PymdqUtYodo5R1GcW47G9PaQJTIQWY7OxBIt0H79JD4PVqVc4zkk/a11mXo946m82/ZHBd4t4GZSXRrF8sjcI4Pd/wDUFiDrlsD4WvoZKxnaJaDFHJBXZV1LDW3TTxMseI11XEBNO8iE+BO0x/brhzrUp1dwyhCfEXYe4J9o4x1SpsUpUtVD5449dwx7qj5VB21vcnmZp+HcRUMhJsGNjf7PX3G88spYvLznb4+pU3YhfDSU8Lu1wH8sWq7PSMV2lR6q06NmObvuflAH8iDmerbC2lzqKbtlw5XpNVFs9PUnql+8p97jy8ZnOGKc65d7i1vOb3tNTC4WtfU/Cbbyi/5mqCUU8bT9M8mMSKYk7DyGJCEICLDhuK+HVSpyR1J8r976Xnp2JqWRXUgqQDpynlE0nZvibEDDseuQn3KfiR5eUwzQtWd/iZVF6X3+zrtU4chxyFpSYCrkbW+vL8Jq8ZQXKb2vt4zM43ClWmeOScdLOnNFqWpCY8ksCeY+nKaTsli2YfCNhrZS5supHd231+szD1MwseQ0MteA1LsFc5coOQ+J6SpL4kXcrRrcRwhfiltNQLgajMNDY9NvrGcdggB3Zc8KQlEZx3sxVvI/KfcW9ZIx+EFrr6zlnHezohPajA1BrGqlDS8s+KoAfzlU2IIBHIxxt8DkysriMlh5SfVIOkjPQ9Z0xfs55xfQ5gWF56p2bRUoFjbMwAGwsD4dZ5TQAvaa3szQLuBqf0kSdOwirVDvH2b+PtyyUwPIIBp63lt29CjA5j8w+ER5/ERfwLD1Mru1VMo1NwdSMvoDp+cTjmFqYnAmzElAHA3zBLkrbyJt4gRRktSv6FOL0uvR55Xwyhtp0i2iu97HqAf36zuiJ0W63JgldouuzWFL1VP8qnMx5WE2/aBQcPVZgbGm+vL5DMr2eos5Ko2UXXN18NuW803abEgYWsim6rRYX6nKw0nNdyN5bR/xnkc4nc5naeOcmEDCWSPzpHKkMpsQQQehBuDOIokss9Dw1dMTRFRbAnRh9lh8w6+XgRKbG0iGsy+spuCcTbDvm3RrB16gbEfeH6jnNtXRaqZ0IKsLqR0t+PK04pw0u+j1cGVZY0+ezLYvh43XWQqYyuCDqDt1sZbVHamSDqrHveXhIGIQBs6are4NtI4yfY5xXKPTeDYpXwyk6Nlyt4MNreINpZU0LJe245deYHrPPOCcayKQRfQ2X7TtoNek3WHrmk2VrFDa/wB0n+YeHUevW6kr5ITrgzvHMKNZkK9MqTPS+M4fNfl+9Zhsfh7MRMovS6Nn8kU7G+kbLlbgx7YyRiKIZA03ujF2yvpOM09D7EFQw66+g/d550iazedmGIVWRrE/SEuUKO6ZcdqeHM6Z9wh0Hmbn1kzhJVMKXbbKSQdrKLmHEcTakwN2t+zGUC18O1MiwdXQ+TqVJ9jJ2sbTaPGcOO6vt+Em00kJVKtlYWINmHRgSCPeWCbidE+TPxnaL3gwbOmX+YhWA5q2h/X0l32tb4GAdSdXZUW9rkZsx/8AirSNwTBnMlzcPz5gjx9JWf8AUrGlq6UQe7TQEgfbcsdf7An+R6znxLVM18mWnH+TGGIZ1OZ2nlCGEWEoQ9CF4SRhLrs7xkUSUcn4ba6C+VuuUakHS9ug8b0sIpRUlTKhOUJao8m44hTR0zq6MrbFSLHW1vpM3/4yb94Nug287yJgse9I90gqfmRtVPpyPiJbU61KsNO4/wBhyLHwR+fkdZz/AMbj9o9COeOTnZkZO6c6gG4Nudr/AJzc8C4wtamqOe+BYg7sF09dLTEvRZGsBpzB5QpVyjq6mxBv4Xk8lVR6HTxGRMr3C6lWY7LvYnw1t4DylJxVkbVWRh91gfwnKcWFdQp7rs23MEAWYe30kTjHZ4MQyXVrE90200026sJlpV7mtvTaKOuQGlrhFDUyDKqtwLEKRYhgdibj05iSsNUdO462PI3BBmkkq2ZkrvdUM1MKQbgX8JqOzDjIOoOqnca9OkpkrBtRtzPLYfqPeXvAMupG+356xWFFv2qqVlpo9BEJOj5lvZeQABFvOT+D2NIErkYjVbkgHnY9JMZAUAlXxTE/w9F30uNEHVzonoCbnwBgwR5fxHBl8TWK2sa9UrbmDUciT8Nwh7gOvpv66S2wuCRMMz1VCsLBDfVi3ynzFifSX2DZHGZDfUC/ixGm3UkxTySZrjxxgthnhmEKWXOSU76abKdCvveefdq2JxmIubn4hH+Kqv0tb0nqlautFKtdgctNWy6WJCgkgDxNgJ4xWqs7M7as7FmPVmJJ+pM18ePLOTzJp1E4hCE6TgOTCBhAB4QiRQYDCEIl46A6Vbm3WFdTy26TqhuT0H4/sxvEYgLofpEBNwfFnSyupdNrFgGH9J/I3HlLFVSsb02BPNWIVx/bfXzFxMqa/wB4n+0X/GKjkkFS1+o0seoN9JMsSe/DNYZ5R2e6NRRf4dRGN7q3lpNanElqalrd4gafaAAI9gZnuCYqniUNOqR8ZdATpnHJrc2HO2+/ONpek6g6pmNj01IBM5pKnTO+E9UbXBrsRhLkLn7g0uQLubAAabG5B9BvrK3iuAZ0U7OpAHO6mwN/XW+un0sMJXUgZgDcc97jb17t/Sc42mzL8NXILNdGIBtYEgFdyAed77esVuaJ2jPqtagjWQMLXJU5iBpqQRsLjraWnCkV0pV6bBTntWTruQ6+gAPmPEmvwvGXwtb4WIy8jmv8ynTMDzF1ItuCDLRMRh6CnEBgtOq5CqASVa7HLYAmxCki/S3SXpfrcz1xrnY0oxLWlfxdlrCmHYKql2ZmICgqmbvHldc/rKd+2GGB0+I3SyAX/wAmEzXH+OVcRamvdR2sVGrMAQQGb7N7dNpSxPszlmjxHktqdVsdXtr8FMy0xtysGbxbQ+AsORl92fxSaJSBZE0znRXdbXZfDc35mZHE4lsMowlM3d7Cqy/y5j8g+8QQDroNOZMv6d/9PC0nsEXPXcW2+ZUJ5C2p63Xxkzj2bRlexK7fYjJgFQt3ndE8wnfPp3F9xPLjLftHxhsTUvfuJdaY+7fVz4sQD5BRylOTOiEdMaPNzTUptrgDOYsSWZCwhCUA7EheF5ICiES8LwAforofP8v/ANjGIcA2Kk+Ws6fNlGU238yb/SQn+JtdvK8oGxXsN1VfA95vblEdQbFST0vp6ACKmHIF7C/VvlB6eJiVUP8AMfDTz53gIb7ym9iCNQQToetxLajx5rBaoz22bZvXk371lM1uRM4icVLkqM5Qdpm04fxT4jKEYZi3dVtDm199CdAecn1qrMWqZ3SpTHeUMToq7qDoBZTcAePngKZ8Tfl5zbcB4kH+HVIzNTYJVH2le6g28RofEeMwnj07rg7cObXs+SH2zfN/DOu7UbXOpPfc2sR976zPHFOVyFhlBuF/lDHmBewPjJXHBkrPRLuVou6U762UMbWBtbrI1HDowLZmABF7gDe+xv4H9JvFUkjjySuTY5SVmF7i2tsoFyQrG3UfL9ZpOC4dER669+sGKU6bAMSShb4hvsFGXz1HPTMVsTZbIuVe9Y8zm0Niddr7dZIwNSp3qrOyKQQSmhNzew6KCd/Gw3g42gxz0uy7wtT4RypapiahFy4BFNmNzqdGc3F76DnfacYvHfBR6SOWqVNK73vbcGmrX1vrmb011tAo1703FMlVGXW3eJWy6t/SSbLp13kKRp33NJZm1SEMSBhKMAhCJKGBhEhAQ9eJeFoSRsWAnMDABx6oVQLjY7/1HWQ2xTXsPoJNXLluQNNNRy3/AFkfEOT3VtbTYAXvfnfbTeNCEfEGwBFvDNYn22kVg3T846KdhcC45t+nQTkrzPoPPrGIYM5jjGcRgOU0v+/0klHqUzmXS2hI6dCDuPMRmlTuJ3TLDQN6Xsf8Ta8Q064OK2Kd2Ls2ZmJJLWJJO51iKzHZQf7F/SSTTJ+ZL+QsfbQn3Ma+CL91je+17MP7Tb6ExiCnWZWFwB/Yo/KWuIqh1CtmsurAEKltNXa3htv03lefiqDuQBrmBBFvOO0cU7JlC3sblmPdU8ib6aeMQywooSjACwykILWvzuByB8dTueUrJMw2LswBfMb95v5QOgJ1YkyNVWzMOhI9jADiEIkACEIkAsDCEICHAYXhCSMIQhAByhqbXtcaeY1H5+8YaoyaMoAO9hvbWdqbG8eapmFmUHr59Y0BEqPf5dB06xp997nr+kk4gAAWkNjaMQ2ZzFYxIwJWGkqoykWZSdNCBqPIyJhr3lk6qy2z5GGxuR6aRAV6UfsVBfmCSp+un1jVXDuNSp89x7jSSahdfnpqw+1bf+5YfxaLtRyn+tre0YESiVuM18t9QN/ST3ro9gAxA2UkKi+gufW95EzGo92IW/PkPISxTDohvdWtzZgBf7oHOAD1LDWsWtmGqoosq+J/UyNiVs59D7i8UYjXRhrqQl/Us51/e4nFdwWuM1rD5va48NIhjcIRICCEIQAIQhABycmEJIxRFhCABHE/IflCEaAaq7GQzCEEIZhCEoCRQjr1Cbg7QhEAUQVbusw8jblHOJ1WIp3JPcDa9SdbwhACBm8BDMPsj6/rFhGBLwpvqeu1hb2j9U3VGO5U39GIH0hCSxoahCEYhINCEACEIQA//9k=",
            steps: [],
        },
        {
            id: 3,
            name: "Pudzian with sword",
            ingredients: [],
            image: "data:image/jpeg;base64,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",
            steps: [],
        },
        {
            id: 4,
            name: "Happy pudzian",
            ingredients: [
                {
                    id: 1,
                    name: 'tomato',
                    unit: UNITS.PIECE,
                },
                {
                    id: 2,
                    name: 'apple',
                    unit: UNITS.PIECE,
                },
                {
                    id: 3,
                    name: 'noodles',
                    unit: UNITS.G,
                },
            ],
            image: "https://i.wpimg.pl/1200x675/sf-administracja.wpcdn.pl/storage2/featured_original/62c0a585ad4e98_32516920.jpg",
            steps: [],
        },
        {
            id: 5,
            name: "Pudzian with pudzian",
            ingredients: [],
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThX1LWPVTKXJYMbg3r6hUi_4Rt_Xq6sx_WvA&usqp=CAU",
            steps: [],
        },
        {
            id: 6,
            name: "Strange pudzian",
            ingredients: [],
            image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBIVEhgVEhIYGBgYEhISEhISGBERGBISGBQZGRgYGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDszPy40NTEBDAwMEA8QHhISHDQrISE0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0MTQ0NDQ0NDQ0NP/AABEIAPYAzQMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAACAwEEBQAGB//EADoQAAIBAgMGBAIJAwQDAAAAAAECAAMRBCExBRJBUWFxIjKBkaGxBhNCUnLB0eHwI2KCFKKy8TNDkv/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACURAAICAgEEAgIDAAAAAAAAAAABAhEhMQMEEkFRIjITYXGBkf/aAAwDAQACEQMRAD8A0mIvCIzy9oAI5esNRLOYiTuwws4CIZCrDAnASYAQZEK0m0AFkSCI0rI3YDEEGduxpWQYCsVuwWEdIMB2V2EAywVi2WDAQZEaywCIh2AYDGMYQVpXzgBXJhWJjXp9O8WF4iMZNMWPOaCJlmIGGo7tiRmZYckkWjSGOw6bydQSLdIa0hbPLXSUjiWRsxcX4azVp1lZQym4PwI1gBkHWNURSjOOUQMWGBJtOSEBFQJnASbQhC3Y2hoC0m0m0iKiibSGEkSHxVJDZjvN9xcz68vWEpKKtjjFywjkpM2gl7DbMv5v0+MwMZtXFNlSVUXp4mPrpMqqcSf/ACMzfiJnK+oi3SZ0R4Gto+gJgcP9pk/+v3hNs3DN5XW/R54fCb4+yR8vhNKkjnX45/ERfkZf40bWI2C1r02B6H9RMjEYd0NnUg9Zew2+LbrFTzBmp/qd4bmJQMNN9cmXqRNI8vszlw+jy5WAyzWx+zSh3lO8h8rj5HrM9lmydowarZXZJKWEMLBZY0hC3F/5wnBAFHec+Rhq8Y7HBcrdo1KcDdjVOUCheIQbpPGZ61SPLp3tL9U/KZzMBqIAXVEYIMYggYBKI8LFoIxYwOtOtCnQGBOJhGZu1MTugKNWNuu7xkydFxVuijtXabtdKN+ILjj+H9Yey8GQni1OZ6mOIUhVUC+WnKaNNLCeX1XM77UelwcaSOp0BHrQ6SaImhQS84ops6qRnDCjlaWqG6NRpLr4eL3BN4ylElwTJTdicRUlpKYinw95o+RtYJ/HQmjWupU6EZjgf3mRWWxmlVo7ucrugJseOnedXBy+GcnPxXlFBjAvHNTsbQCk7EcIl5CrGskFBGMcgjG0g25ybjj/AAQKRWdr6n9pWqoMrEHnNF0FsheZ1ZDfIQGXhDWAsaogjAYsYsBRDEYyROkyIrKBaYmLp79RmN7JZQNLm2k3GPOYuKcmoV4b8y5JKjbhi+62PwaZ3/np0l9mlSgto4GeHzSubPVgvii0rTQwdXOZaGXMKc8jCDyWzXqtlKrNCcG3mldiePvNZME6LStGoQTM/wCs6x1NzwN4RkDyNxyi0zCLDsRLOJxBOUpVGymkZfJGM4/FicWvjPWV7Szi2G9lyErietHR4838mA04JJYyQRxlCTJYG0lRlBLrOFYcrwKTOLZyrVqbpsBG1XF7gcZVqEE6wKsvgRqwCM4YgjKhghrFrDEbGgpIgzpLLIV2NypsBkBYG5tnfnKlTDqz3tY6kdRrLYcpTYjM3Nu8q1g5S9QWfzgjTPrPFU3Gds9dwUoKjkElxaKwzE6yy6X0nPKSlJtGkYtIWhzmtgRnnMOtWKeUXPylZ9qVUN1YdVuLmOCpjbPZMw5wCg/eYGC2+r5P4W9M5qU8cCMpo5K6Ylos7vb2EIqLaDvpKZxlpIxO9p7wTQ8CcS2cp4h8pexKDdveZVUkmPjzNGc8RYxmvBkkyLT3IqonhydybBkNCkNGIUZ2Um8BjAaZz6REaxuIBEC0aQjAICxgiQqJAkidJjBI4wTJMi8BoKnTvccDr06iDtAWpi+oNozD1N0xO1nXcAX72ftPD6qLjN0j2OCSlxoo4Vs5r0qQYTGotYzawVTScUdnTQjF7JR8nLWORsSvynnMZ9EqKVN5arboz3CBn/kM57sqCM5TqYKmdR8TOpScVgzlBSPC0NmVDUsj3Auc7mw5XnpsHhWVTkep1JmqKSIPCoEZgk3r94m+5q9h29qPn+19uOlQooN1Nj3lPB/SKpv2O8TbS3ytPeYz6PUqjfWBfHfQ2sf3i6WyKYN2ogn8C/O82Xalozab8mTs7FtUW4YkcQby7TXMnuD3yt85otgkRbhQD0lMCy9yT8YcMe7lS/sz55dnG2A0iFBntHiEQWhESDAoXAYw2i2gNC2NpE55wERSNRYyLEOMYc4QRCgBDQZJgkxWMmIx6f0w39wt8ZYRSxAHEytt+ruUx/diBRXoEViT729py9VXY1+jp6dPuRTZcriXcLXtaVcOwKw8Omc8BRzaPV7jZXG5StidpWyGZOgEz8S7DJRck2AlvZuD3TvVDvMeWijkJolJ+R2WKDuV3ja3ymngF8PqT8Jl4lGUk09NSmh9P0gUNtBRuDXS3ES4NRlkmWUaAx4RgrDIk2MvLWUi954/blepuI4HhVswOAI1jMJjmKa8JcuRwy9CSTNjaNblKTcOwEZhqLPLQwDdJ29Ck25vycPWttKKM9lg2l2phHGqnuM5XemZ6eGeY4tCWEgrCnNABDiLaPcRLwAQ05WnPIDRFo1YwRYGcOMZM6RLNLCO3Cw6yW0ilFsqmMTDudFM2sLsxRmZpU8MvKZS5PRquMwNmUTvEkeU7o7jX9JQ+l2zmsjqCU+vFRv7GZSpv0Jt8Zu4anbfHKpUB9WLD4ES4tipVwCrCzKcwQZhP5xa9m8fi1R89tuHodJew5E0dsbEKKSniTUHinRv1mNh2IyPCeTLjlF0ztU1LKNAgagQKLVLkgjopBHxkUXzl9FGoiKRVqYpx5qb91s4+GcpVNxmDKDvdFa/rlNOszKLqbel5WTF1CbadbERXnZVIRjPrDSawt4ftcfSTgMOBTF+Muut1IOdxJwdO5uR4UHD4zSK7qiQ325NrZWGstyOsbSUknuZZo5JccRlIw9PUmenxpRVI4pu2KR7sRIbCU6gNxYi97TOpV/6jX+8fnNPDHzN2mqlRm4p7MXE7LZblfEOmomc6ET12BNy3K5t7zsZspamYFjzE1jyezCfF6PGOYlpoY7BvTazDsecoOJpdnO00xDiBaNYSAsRSNEHOPo0mc2A9Y3B4MsxvpvH1zno8HgwOEiU0jeML2UMBssDM5nrNilhQJYRBDAnPKTbNlUcIUKQnCmBHGBJbBMzMSm5U3/sPZan9rjJW7EZe0a1Kxl2pTDKVYXBFiJUwRPiRjmhAuftIfKfb5RJ0UmCFI0mXj9iJUuUG4/Ajyk9V/SbzJB3ISSkqaHF1o+fVaTI5VhZhqp+Y5jrG0q3Wes2ns9KgzUEjnnPNvglRrWIv1JHoDpOWfTX9Wbx5q2NpYkcY1sSloqlswH7dvS8fgNmIzsG391LZsNxXPIXzI69ZkunmjX88ReHwr1DkLDix0AmrhsEu6FX3595bbdVd1Mu3KFh0tOrj4lDPkwnNyK+AUrvUm1Q3XqjaW7G4l3csDFYkbtRH4Z037N5f91veWGOs2izJnl66FahHW82MJ5D2lHH0v6l+c2NmYY7t20OQmhLZOzaGRPMzTVbSKYAAA7Qo0Q3ZT2hgUqIQR2PIzwm0sE1JrMOx5ifSJmbX2etRCCM+B5GaRlRnKNnztoN4/E0WRipGYOcrzRGGj3OBo5nufnNlEylPBpme5mhacsnbOzSBAkidJEzAgwTCtOMbQIi0p4kbro/M/Vv2Y+E+h+cvWiMRS3lKniLdjwMTWBpli0goIjBViygnXRhyYZGWpcaasl2iucPnkZUxezA44X4TRvnboT7f9wpSih9zPOYFGTf3xbxqt+S2197y1inLIyqbXBXeGeXGaT4cEnrM+thHXTMSHFotSTPKYlalBvC5tyOYI7T0OxdoiqliLMvmH5iZ22qJKi44GUdhrUWshCm17Pkbbp1klHr8TS30Zeam3RuB97QcEDURX5jP8QyI9wZoBBKmz2AZ0H2XLDsxv8AO8pRpr9mblawEMAl7tnLagAWEmdNdEXYK6kevvDi2yIPcfmIRiugCgsJIM5o7tAeU+k+z/8A2KNMm7c55bcn0nFUQ6lToQRPA4vDFHK8j7jhLhIznDNnucIcz3l4TOwpzPeaHCYPZsybTrTlN5MSQjrQTDgtHQEiCywhJlVaAzqZ3KxXg431/GBZh7WM0BKW0KZK7y+ZCHXqRqPUXEsUKoZQw0IBHrM4unQ3nJFTzr+F7/7Y4QRm1+Q+Z/aMmqV5JYuo1rdxBNTxW6XHWFVW4IkrmAYZsYJpqw8SjsbGVMVRVR4VAztkLS/FV1uvtBrAJ5DQ5SgRu1w3395D38y/nNBdJR2iMrjUFXHdTn8JMtX6Gtl8zoKMCARoQCOxhRvZINQXHxHcSGbK8OVw2RHI2jlgaVjlhGCmkKEdA9iyJi7U2aHYE62IPWbjRLrnDQbKOGbxHuZpppMek1n9ZrUjlIeyno6nkSPWNinyIPpGxr0SzpDSZxlNYABTDixrDEmLyDBqCUcIdx2p8L76fgY5j0JPwmjKGMpMLMg8Sm4H3hbNfWKarKGvRdXX0hyvQrK1mU5Fb/LI9ZYlxdrAmCYNM5ephmV3BNwO/tE3TBKwhUUNa4zzA+f86xxmJjq7q5sAPAu+dSt2IU99fhNLA1SyeLzKd1upHEdCLH1hGVugapWWCfnF10uvaNInGNrYkylslv6QU6oSh/xOXwtLso4cbtZ14MquO4yb8pekx1/A3smUajWqW5i8vTN2gd10brYxz0OOzQWTBEmCYiDFsYZMQ5zjAzFPjmthzlMg+f2mnhjlJl9ivBYqrcEe3edSa4BhRSZMRz8Q/OH7JHTp04xsBZ1hiCYQkoGSJxE6TNFlCM9qLI5ZBcG5dOuXiXr0lmhiFYZHTUHIqeRHCOMq4jBq+eatwdcm/cSKlH6/4O09lqVyc4gCuotvK3IspHuV/SVsSHbJmOYzSkrAt0LnQSZNvwVFC97f33UX/qpa2ZKIRoOPE+sdgn3SrDyMTTBPEA+A/wDJfaTRpsqALkSc1HI/dPQfKMFHeVlA3RYbtzc74+0MzYAge0Eq/kbNGA50HWBhqu8gOh0YcmGRHvJ1btNG7WPJmlkRi8npt/cU9GH6gS5KW1PICNQ9MjuHEt02uAZKxJob1YQmdthfADyb5zREq7SW9Nu1/bOVL6gth4WpvIp5qI6Zmxql0K8mPsc5oSUxtZOMURGmLMYGQ58ftNHDNlM6p5vQS5hminspaNBTArjQ8j8OM5DGMLi0XgjTJBkxVE5WOoyjZV2geAWkiQZwkgFOnTpaYjjOkGSIJ5AmCRJkEwbAEjwkDkbd54nC7Yq08d9VUYlN4KLgZK+an0y9pqbW+kL0qpRaYsPtNvZ5cAJ5DbGINSotRgEIstwHAI3rjXvMJzVqvBrGLrPk+i1D9W5bRXIvyV9LnoRb1EuU9J46ntuvVTRSpyuEJB4G81tmUqrICrsozBQ2I/xJGUan8sLAnHGS/j6gJVL8Q79EU3z7kASdn1Cbg8cwOkmjgrDM34nUlzzYnXtpElt179c+0eVLuYKmmjTg1FupHMEQrzjNdozMHZDbtRl5j5G02L5zFPhxI6sR7ibcg0ZJijGExZlIkyK3mHYS1RMrV/MO35x1IwnsqOi+jR6mVKZj1aQgaObJgeByPePEVUFx8R3hU2uAZaIeiTOMmcRJoDpMidKTAhtJIMFpymKwCJtFNUjDB3Byg7YKinXwqu1zcGwFxbMCYH0s2NfDkoWYr4xc3N1zy9L+89MwsZGIG8hH8vM5RTT9mik01Wjxf0Ar0336bKpZbOpYA+E5Ee9vee8RQBYCw4AZT5Xs0/6PaQGiF9zPjTfyn0uPafVFaPjeA5FmwjMfE+a01iZl4geKVIUC/h3uoPS3tHEyjg2yI6yyWhF4E45Mbaws4YdD7Ga9NrgHmAZm7WFxH7Oe9Je1vbKKymsF1jFziYN5aIZm4nUdoynOnRz2VHRaUxqmdOmYxyGDSyJHrOnRk+x86dOlkHSLzp0KAi15AE6dCkMi+V5M6dCgAcXgATp0VIpHn9q/RoV6gcsBYAcb2JuM+lzPRUkIAF72AF+eU6dCMUEmGwlWtQudZ06EkEWdQoMDqPjHETp0KC8lbF4VnFgQO952CwzIliQcycr9506FBY+0ndnTo6Ef/9k=",
            steps: [],
        },
    ]
}
