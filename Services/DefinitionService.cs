namespace ConverseTek.Services {
  using System;
  using System.IO;
  using System.Collections.Generic;

  using Chromely.Core.Infrastructure;

  using Newtonsoft.Json;

  using ConverseTek.Data;

  public class DefinitionService {
    private static DefinitionService instance;
    private static string OPERATIONS_PATH = "/defs/operations";
    private static string PRESETS_PATH = "/defs/presets";
    private static string TAGS_PATH = "/defs/tags";

    public static DefinitionService getInstance() {
      if (instance == null) instance = new DefinitionService();
      return instance;
    }

    public DefinitionService() {}

    public Dictionary<string, List<Definition>> LoadDefinitions() {
      Dictionary<string, List<Definition>> definitions = new Dictionary<string, List<Definition>>();

      try {
        string baseDirectory = AppDomain.CurrentDomain.BaseDirectory;
        string[] operationPaths = Directory.GetFiles(baseDirectory + OPERATIONS_PATH);
        List<Definition> operationDefs = new List<Definition>();

        foreach (string path in operationPaths) {
          Definition operationDef = JsonConvert.DeserializeObject<OperationDefinition>(File.ReadAllText(path));
          operationDef.Type = "operation";
          operationDefs.Add(operationDef);
        }

        definitions.Add("operations", operationDefs);
      } catch (Exception e) {
        Log.Error(e);
      }

      return definitions;
    }
  }
}