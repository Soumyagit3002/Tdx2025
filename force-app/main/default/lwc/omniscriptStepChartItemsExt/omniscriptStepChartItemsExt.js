import OmniscriptStepChartItems from 'omnistudio/omniscriptStepChart';
import tmpl from './omniscriptStepChartItemsExt.html';
export default class OmniscriptStepChartItemsExt extends OmniscriptStepChartItems {
render(){
    console.log('from stepchartItem1');
    console.log('testttt');
    console.log('inProgress'+this.inProgress);
    console.log('inProgress'+this.pristine);
    return tmpl;   

} 

}