package com.example.memo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/memos")
public class MemoController {

    private final MemoRepository repo;

    public MemoController(MemoRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Memo> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Memo create(@RequestBody Memo memo) {
        return repo.save(memo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
