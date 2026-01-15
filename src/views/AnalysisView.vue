<template>
    <div v-if="specification" class="flex flex-col gap-4">
        <!-- Style Analysis Card -->
        <StyleAnalysisCard :analysis="specification.style_analysis" />

        <!-- Training Recommendations -->
        <TrainingRecommendationsCard :training_recommendations="specification.training_recommendations"/>

        <!-- Prompt Guidelines -->
        <div class="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Prompt Guidelines</h2>
            <div class="space-y-4">
                <div v-if="specification.prompt_guidelines.keep_simple">
                    <p class="text-sm font-medium text-green-600 dark:text-green-400">✓ Keep prompts simple - let SREF handle styling</p>
                </div>

                <div>
                    <p class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Avoid These Keywords</p>
                    <div class="flex flex-wrap gap-2">
                        <span
                            v-for="keyword in specification.prompt_guidelines.avoid_style_keywords"
                            :key="keyword"
                            class="px-3 py-1 text-sm text-red-800 bg-red-100 rounded-full dark:bg-red-900/20 dark:text-red-400">
                            {{ keyword }}
                        </span>
                    </div>
                </div>

                <div>
                    <p class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Recommended Additions</p>
                    <div class="flex flex-wrap gap-2">
                        <span
                            v-for="addition in specification.prompt_guidelines.recommended_additions"
                            :key="addition"
                            class="px-3 py-1 text-sm text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900/20 dark:text-blue-400">
                            {{ addition }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Navigation -->
        <div class="flex justify-between">
            <button
                @click="goBack"
                class="px-6 py-3 font-medium text-gray-900 transition-colors bg-gray-300 rounded-lg dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600">
                Back
            </button>
            <button @click="goToBatches" class="px-6 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">Edit Batches</button>
        </div>
    </div>
    <Card v-else class="space-y-6">
        <template #content>
            <div class="py-12 text-center text-gray-600 dark:text-gray-400">No analysis available. Please upload images and analyze first.</div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import Card from 'primevue/card';
import { ImageUp } from 'lucide-vue-next';
import { useProjectStore } from '../stores/project';
import StyleAnalysisCard from '../components/StyleAnalysisCard.vue';
import TrainingRecommendationsCard from '../components/TrainingRecommendationsCard.vue';

const store = useProjectStore();
const router = useRouter();

const specification = computed(() => store.specification);

const goBack = () => {
    router.push('/');
};

const goToBatches = () => {
    store.goToStep('batches');
    router.push('/batches');
};
</script>
