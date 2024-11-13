import { z } from 'zod';

export function sharedFunction() {
	return 'wrld';
}

export const sharedDto = z.object({
	hello: z.string()
});
