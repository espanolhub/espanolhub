// TEMPORARILY DISABLED - All content is free for now
// تم التعطيل مؤقتاً - كل المحتوى مجاني الآن

export function useModuleAccess(moduleId: string) {
  // Return true for all modules - everything is unlocked
  return {
    hasAccess: true,
    isLoading: false,
  };
}

export default useModuleAccess;
