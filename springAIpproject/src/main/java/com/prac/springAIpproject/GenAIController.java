package com.prac.springAIpproject;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.ai.image.ImageResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
public class GenAIController {

    private final ChatService chatService;
    private final ImageService imageService;
    private final RecipeService recipeService;

    public GenAIController(ChatService chatService, ImageService imageService, RecipeService recipeService) {
        this.chatService = chatService;
        this.imageService = imageService;
        this.recipeService = recipeService;
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
}
