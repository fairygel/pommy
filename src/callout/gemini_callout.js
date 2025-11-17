import { RequestDTO } from "../dto/request_dto.js";
import { ResponseDTO } from "../dto/response_dto.js";

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export class GeminiCallout {
    async makeRequest(requestDTO) {
        if (!(requestDTO instanceof RequestDTO)) {
            throw new Error('Invalid request. Request object mast be an instance of RequestDTO.');
        }

        let result = await fetch(GEMINI_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-goog-api-key": requestDTO.token,
			},
			body: JSON.stringify({
				contents: [
					{
						parts: [
							{
								text: requestDTO.prompt + '\n' + requestDTO.pageData,
							},
						],
					},
				],
			}),
		});

        return new ResponseDTO(!result.ok, result.status, await result.json());
    }
}