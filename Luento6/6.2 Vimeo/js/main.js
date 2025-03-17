import { CSS3DObject } from "../../../libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js";

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener("DOMContentLoaded", () => {
    async function startAR(){
        const mindArThreejs = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: "../../assets/targets/targets.mind"
        });
        const { cssRenderer, renderer, cssScene, scene, camera } = mindArThreejs;

        const div = new CSS3DObject(document.querySelector("#ar-example"));

        const anchor = mindArThreejs.addCSSAnchor(0);

        anchor.group.add(div);

        

        await mindArThreejs.start();

        renderer.setAnimationLoop(render);

        function render(){
            cssRenderer.render(cssScene, camera);
        }
    }
startAR();

});