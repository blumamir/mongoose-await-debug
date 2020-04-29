import * as opentelemetry from '@opentelemetry/api';
import { NodeTracerProvider } from '@opentelemetry/node';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import { SimpleSpanProcessor } from '@opentelemetry/tracing';

const serviceName = 'amir-mongoose-async-debug';

const provider = new NodeTracerProvider({
    plugins: {
        mongoose: {
            enabled: true,
            path: '@wdalmut/opentelemetry-plugin-mongoose',
        }        
    }
});

const exporter = new ZipkinExporter({
    serviceName,
    url: 'http://localhost:9411/api/v2/spans',
    
});
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.register();

export default opentelemetry.trace.getTracer('test');