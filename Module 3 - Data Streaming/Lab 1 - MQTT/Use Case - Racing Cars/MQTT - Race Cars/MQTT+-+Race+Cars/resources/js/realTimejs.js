/* ======================================== */
/* ========= Center of Excellence ========= */
/* ========= Hitachi Vantara 2018 ========= */
/* ======================================== */

define(['cdf/lib/jquery', 
        'amd!cdf/lib/underscore', 
        'cdf/lib/CCC/protovis',  
        'cdf/Dashboard.Clean',  
        'cdf/lib/CCC/pvc', 
        'cdf/dashboard/Utils', 
        'cdf/lib/moment'], function($, _, pv, Dashboard, pvc, Utils, moment ) {
        
        
    /*-------------------------------------------------------------------------*
     *                      MISC functions && settings                         *
     *-------------------------------------------------------------------------*/
    
     
    $(document).ready(function(){
        $('body').addClass('dashboard-example');
        
        $(document).prop('title', 'Real Time Data');
        
        //$('body > .container').addClass('container-fluid').removeClass('container');
    }); 

});

var dashboard_example = {};

var first_time = true;

dashboard_example.lineChartOptions = function() {
    var cd = this.chartDefinition;
    // bars
    cd.colors = [
        '#613d9b', '#e5650e'
    ];
    
    cd.baseAxisLabel_textAngle = 0;
    
    var labels = [];
        
    cd.timeSeriesFormat = "%Y-%m-%d %H:%M:%S";
    
    cd.timeSeries = true;
    
    cd.baseAxisScale_dateTickFormat = "%H:%M:%S";
    
    cd.baseAxisDomainRoundMode = "none";
    

    cd.orthoAxisTitleLabel_textAlign="left";
    cd.orthoAxisTitleLabel_textBaseline = "bottom";
    cd.orthoAxisTitleLabel_textAngle = 0;
    cd.orthoAxisTitleLabel_textMargin = 17;
    cd.contentPaddings = null;
    cd.contentMargins = 0;
    cd.baseAxisLabel_textStyle = "#414141";
    cd.orthoAxisLabel_textStyle = "#414141";
    
    cd.axisGrid_strokeStyle = '#f0efe9';
    cd.axisRule_strokeStyle = '#f0efe9';
    cd.axisZeroLine_strokeStyle  = '#f0efe9';
    
    cd.baseAxisDesiredTickCount = 8;
    
    cd.orthoAxisSize= null;

    cd.legendAlign="right";
    cd.legendFont="lighter 12px Open Sans";
    cd.orthoAxisTitleLabel_textStyle = "#999999";

    
}


