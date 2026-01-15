<template>
  <!-- Training Recommendations -->
  <Card>
    <template #content>
      <h2 class="text-xl font-bold">Training Recommendations</h2>
      <div class="space-y-4">
        <div>
          <p class="text-sm text-gray-600 ">Recommended Dataset Size</p>
          <p class="text-2xl font-bold ">{{ training_recommendations.recommended_dataset_size }} images</p>
        </div>

        <div>
          <p class="mb-2 text-sm font-medium ">Subject Distribution</p>
          <div class="grid grid-cols-2 gap-4 md:grid-cols-3">
            <div v-for="(percentage, category) in training_recommendations.optimal_subject_distribution" :key="category" class="p-3 rounded bg-gray-50 ">
              <p class="text-xs text-gray-600 ">{{ category }}</p>
              <p class="text-lg font-bold text-gray-900 ">{{ percentage }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card';

import type { TrainingRecommendations } from '../types/schema';

defineProps<{
  training_recommendations: TrainingRecommendations;
}>();
</script>
