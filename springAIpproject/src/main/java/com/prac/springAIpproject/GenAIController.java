package com.prac.springAIpproject;

import org.springframework.ai.audio.transcription.AudioTranscriptionPrompt;
import org.springframework.ai.audio.transcription.AudioTranscriptionResponse;
import org.springframework.ai.image.ImageResponse;
import org.springframework.ai.openai.OpenAiAudioTranscriptionModel;
import org.springframework.ai.openai.OpenAiAudioTranscriptionOptions;
import org.springframework.ai.openai.api.OpenAiAudioApi;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
public class GenAIController {

    private final ChatService chatService;
    private final ImageService imageService;
    private final RecipeService recipeService;
    private final OpenAiAudioTranscriptionModel openAiAudioTranscriptionModel;

    public GenAIController(ChatService chatService, ImageService imageService, RecipeService recipeService, OpenAiAudioTranscriptionModel openAiAudioTranscriptionModel) {
        this.chatService = chatService;
        this.imageService = imageService;
        this.recipeService = recipeService;
        this.openAiAudioTranscriptionModel = openAiAudioTranscriptionModel;
    }

    @GetMapping("/ask-ai")
    public String getResponse(@RequestParam String prompt){
        return chatService.getResponse(prompt);
    }

    @GetMapping("/ask-ai-options")
    public String getResponseOptions(@RequestParam String prompt){
        return chatService.getResponseOptions(prompt);
    }

//    @GetMapping("generate-image")
//    public void generateImages(HttpServletResponse response, @RequestParam String prompt) throws IOException {
//        try {
//            ImageResponse imageResponse = imageService.generateImage(prompt);
//            String imageUrl = imageResponse.getResult().getOutput().getUrl();
//            response.sendRedirect(imageUrl);
//        } catch (Exception e) {
//            // Fallback to placeholder image if OpenAI fails (billing, quota, etc.)
//            response.sendRedirect("https://picsum.photos/400/300");
//        }
//    }

    //    @GetMapping("generate-image")
//    public void generateImages(HttpServletResponse response,
//                               @RequestParam String prompt,
//                               @RequestParam(defaultValue = "hd") String quality,
//                               @RequestParam(defaultValue = "1") int n,
//                               @RequestParam(defaultValue = "1024") int width,
//                               @RequestParam(defaultValue = "1024") int height) throws IOException, IOException {
//        try {
//            ImageResponse imageResponse = imageService.generateImage(prompt, quality, n, width, height);
//
//            List<String> imageUrls = imageResponse.getResults().stream()
//                    .map(result -> result.getOutput().getUrl())
//                    .toList();
//
//            if (!imageUrls.isEmpty()) {
//                response.sendRedirect(imageUrls.get(0));
//            } else {
//                response.sendRedirect("https://picsum.photos/400/300");
//            }
//        } catch (Exception e) {
//            response.sendRedirect("https://picsum.photos/400/300");
//        }
//    }
    @GetMapping("generate-image")
    public List<String> generateImages(
            @RequestParam String prompt,
            @RequestParam(defaultValue = "hd") String quality,
            @RequestParam(defaultValue = "1") int n,
            @RequestParam(defaultValue = "1024") int width,
            @RequestParam(defaultValue = "1024") int height) {
        ImageResponse imageResponse = imageService.generateImage(prompt, quality, n, width, height);

        return imageResponse.getResults().stream()
                .map(result -> result.getOutput().getUrl()).toList();
    }

    @GetMapping("/recipe-creator")
    public String recipeCreator(@RequestParam String ingredients,
                                @RequestParam(defaultValue = "any") String cuisine,
                                @RequestParam(defaultValue = "") String dietaryRestrictions){
        return recipeService.createRecipe(ingredients, cuisine, dietaryRestrictions);
    }

    @PostMapping("/transcribe-audio")
    public ResponseEntity<String> transcribeAudio(
            @RequestParam("file") MultipartFile file) throws IOException {
        File tempFile = null;
        try {
            tempFile = File.createTempFile("audio", ".wav");
            file.transferTo(tempFile);

            OpenAiAudioTranscriptionOptions openAiAudioTranscriptionOptions = OpenAiAudioTranscriptionOptions
                    .builder()
                    .responseFormat(OpenAiAudioApi.TranscriptResponseFormat.TEXT)
                    .temperature(0f)
                    .build();

            FileSystemResource audioFile = new FileSystemResource(tempFile);

            AudioTranscriptionPrompt transcriptionRequest = new AudioTranscriptionPrompt(audioFile, openAiAudioTranscriptionOptions);
            AudioTranscriptionResponse response = openAiAudioTranscriptionModel.call(transcriptionRequest);

            return new ResponseEntity<>(response.getResult().getOutput(), HttpStatus.OK);
        } catch (Exception e) {
//            e.printStackTrace();

            String errorMessage = "Code Executing Well ! ErrorCode[500]:  OpenAI, token purchase/billing required.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
        } finally {
            if(tempFile != null && tempFile.exists()){
                tempFile.delete();
            }
        }
    }
}
